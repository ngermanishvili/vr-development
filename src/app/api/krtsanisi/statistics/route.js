import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const buildingId = searchParams.get('building_id');
    const blockId = searchParams.get('block_id');
    
    let baseWhere = 'WHERE 1=1';
    const params = [];
    
    if (buildingId) {
      baseWhere += ' AND a.building_id = ?';
      params.push(buildingId);
    }
    
    if (blockId) {
      baseWhere += ' AND a.block_id = ?';
      params.push(blockId);
    }

    // Overall statistics
    const overallQuery = `
      SELECT 
        COUNT(*) as total_apartments,
        COUNT(CASE WHEN status = 'available' THEN 1 END) as available,
        COUNT(CASE WHEN status = 'likely_sold' THEN 1 END) as likely_sold,
        COUNT(CASE WHEN status = 'reserved' THEN 1 END) as reserved,
        COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold,
        AVG(total_area) as avg_area,
        MIN(total_area) as min_area,
        MAX(total_area) as max_area
      FROM krtsanisi_apartments a
      ${baseWhere}
    `;

    const [overallStats] = await executeQuery(overallQuery, params);

    // Status distribution
    const statusQuery = `
      SELECT 
        status,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM krtsanisi_apartments a2 ${baseWhere}), 1) as percentage
      FROM krtsanisi_apartments a
      ${baseWhere}
      GROUP BY status
      ORDER BY count DESC
    `;

    const statusStats = await executeQuery(statusQuery, [...params, ...params]);

    // Building breakdown (if not filtering by building)
    let buildingStats = [];
    if (!buildingId) {
      const buildingQuery = `
        SELECT 
          b.building_name,
          b.building_id,
          COUNT(a.id) as total_apartments,
          COUNT(CASE WHEN a.status = 'available' THEN 1 END) as available,
          COUNT(CASE WHEN a.status = 'likely_sold' THEN 1 END) as likely_sold
        FROM krtsanisi_buildings b
        LEFT JOIN krtsanisi_apartments a ON b.id = a.building_id
        GROUP BY b.id
        ORDER BY b.building_id
      `;
      
      buildingStats = await executeQuery(buildingQuery);
    }

    return NextResponse.json({
      success: true,
      data: {
        overall: overallStats,
        status_distribution: statusStats,
        building_breakdown: buildingStats
      }
    });

  } catch (error) {
    console.error('Krtsanisi statistics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi statistics' },
      { status: 500 }
    );
  }
}