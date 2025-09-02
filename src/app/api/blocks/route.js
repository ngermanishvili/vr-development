import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

// GET /api/blocks - Get all blocks with statistics
export async function GET() {
  try {
    const query = `
      SELECT 
        b.*,
        p.name as project_name,
        COUNT(a.id) as total_apartments,
        SUM(CASE WHEN a.status = 'თავისუფალია' THEN 1 ELSE 0 END) as available_apartments,
        SUM(CASE WHEN a.status = 'გაყიდული' THEN 1 ELSE 0 END) as sold_apartments,
        SUM(CASE WHEN a.status = 'დაჯავშნილია' THEN 1 ELSE 0 END) as reserved_apartments,
        SUM(CASE WHEN a.status = 'ნოშიკოს ჯავშანზეა' THEN 1 ELSE 0 END) as under_reservation,
        ROUND(AVG(a.total_area), 2) as avg_area,
        MIN(a.total_area) as min_area,
        MAX(a.total_area) as max_area
      FROM blocks b
      JOIN projects p ON b.project_id = p.id
      LEFT JOIN apartments a ON b.id = a.block_id
      GROUP BY b.id
      ORDER BY b.block_code
    `;

    const blocks = await executeQuery(query);

    return NextResponse.json({
      success: true,
      data: blocks
    });

  } catch (error) {
    console.error('Blocks API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blocks' },
      { status: 500 }
    );
  }
}