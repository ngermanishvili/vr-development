import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

// GET /api/statistics - Get project statistics
export async function GET() {
  try {
    // Overall project statistics
    const overallQuery = `
      SELECT 
        COUNT(a.id) as total_apartments,
        SUM(CASE WHEN a.status = 'თავისუფალია' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN a.status = 'გაყიდული' THEN 1 ELSE 0 END) as sold,
        SUM(CASE WHEN a.status = 'დაჯავშნილია' THEN 1 ELSE 0 END) as reserved,
        SUM(CASE WHEN a.status = 'ნოშიკოს ჯავშანზეა' THEN 1 ELSE 0 END) as under_reservation,
        ROUND(AVG(a.total_area), 2) as avg_area,
        MIN(a.total_area) as min_area,
        MAX(a.total_area) as max_area
      FROM apartments a
    `;

    // Statistics by block
    const blockStatsQuery = `
      SELECT 
        b.block_code,
        b.block_name,
        COUNT(a.id) as total_apartments,
        SUM(CASE WHEN a.status = 'თავისუფალია' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN a.status = 'გაყიდული' THEN 1 ELSE 0 END) as sold,
        SUM(CASE WHEN a.status = 'დაჯავშნილია' THEN 1 ELSE 0 END) as reserved,
        SUM(CASE WHEN a.status = 'ნოშიკოს ჯავშანზეა' THEN 1 ELSE 0 END) as under_reservation,
        ROUND(AVG(a.total_area), 2) as avg_area,
        MIN(a.total_area) as min_area,
        MAX(a.total_area) as max_area,
        ROUND((SUM(CASE WHEN a.status = 'გაყიდული' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 1) as sold_percentage
      FROM blocks b
      LEFT JOIN apartments a ON b.id = a.block_id
      GROUP BY b.id
      ORDER BY b.block_code
    `;

    // Statistics by apartment type
    const typeStatsQuery = `
      SELECT 
        apartment_type,
        COUNT(*) as count,
        SUM(CASE WHEN status = 'თავისუფალია' THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN status = 'გაყიდული' THEN 1 ELSE 0 END) as sold,
        ROUND(AVG(total_area), 2) as avg_area,
        MIN(total_area) as min_area,
        MAX(total_area) as max_area
      FROM apartments
      GROUP BY apartment_type
      ORDER BY 
        CASE apartment_type 
          WHEN 'სტუდიო' THEN 1
          WHEN '1 საძინ' THEN 2
          WHEN '2 საძინ' THEN 3
          WHEN '3 საძინ' THEN 4
          WHEN '4 საძინ' THEN 5
          WHEN '5 საძინ' THEN 6
          ELSE 7
        END
    `;

    // Floor statistics
    const floorStatsQuery = `
      SELECT 
        b.block_code,
        f.floor_number,
        COUNT(a.id) as apartment_count,
        SUM(CASE WHEN a.status = 'თავისუფალია' THEN 1 ELSE 0 END) as available,
        ROUND(AVG(a.total_area), 2) as avg_area
      FROM floors f
      JOIN blocks b ON f.block_id = b.id
      LEFT JOIN apartments a ON f.block_id = a.block_id AND f.floor_number = a.floor
      GROUP BY f.id
      ORDER BY b.block_code, f.floor_number
    `;

    // Execute all queries
    const [overall] = await executeQuery(overallQuery);
    const blockStats = await executeQuery(blockStatsQuery);
    const typeStats = await executeQuery(typeStatsQuery);
    const floorStats = await executeQuery(floorStatsQuery);

    return NextResponse.json({
      success: true,
      data: {
        overall,
        byBlock: blockStats,
        byType: typeStats,
        byFloor: floorStats,
        summary: {
          totalBlocks: blockStats.length,
          totalFloors: floorStats.length,
          occupancyRate: overall.total_apartments > 0 ? 
            Math.round((overall.sold / overall.total_apartments) * 100) : 0,
          availabilityRate: overall.total_apartments > 0 ? 
            Math.round((overall.available / overall.total_apartments) * 100) : 0
        }
      }
    });

  } catch (error) {
    console.error('Statistics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}