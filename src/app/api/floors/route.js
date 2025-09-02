import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

// GET /api/floors - Get floors with apartments count
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('block_id');
    const blockCode = searchParams.get('block_code');

    let query = `
      SELECT 
        f.*,
        b.block_name,
        b.block_code,
        COUNT(a.id) as apartment_count,
        SUM(CASE WHEN a.status = 'თავისუფალია' THEN 1 ELSE 0 END) as available_count,
        SUM(CASE WHEN a.status = 'გაყიდული' THEN 1 ELSE 0 END) as sold_count,
        SUM(CASE WHEN a.status = 'დაჯავშნილია' THEN 1 ELSE 0 END) as reserved_count,
        ROUND(AVG(a.total_area), 2) as avg_area
      FROM floors f
      JOIN blocks b ON f.block_id = b.id
      LEFT JOIN apartments a ON f.block_id = a.block_id AND f.floor_number = a.floor
      WHERE 1=1
    `;

    const params = [];

    if (blockId) {
      query += ' AND f.block_id = ?';
      params.push(blockId);
    }

    if (blockCode) {
      query += ' AND b.block_code = ?';
      params.push(blockCode);
    }

    query += ' GROUP BY f.id ORDER BY b.block_code, f.floor_number';

    const floors = await executeQuery(query, params);

    return NextResponse.json({
      success: true,
      data: floors
    });

  } catch (error) {
    console.error('Floors API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch floors' },
      { status: 500 }
    );
  }
}