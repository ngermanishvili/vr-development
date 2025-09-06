import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    
    let query = `
      SELECT 
        pp.*,
        b.building_name as linked_building_name,
        b.id as linked_building_db_id
      FROM krtsanisi_portfolio_polygons pp
      LEFT JOIN krtsanisi_buildings b ON pp.area_id = b.building_id
    `;

    const params = [];
    
    if (projectId) {
      query += ' WHERE pp.project_id = ?';
      params.push(projectId);
    }

    query += ' ORDER BY pp.area_id';

    const polygons = await executeQuery(query, params);
    
    return NextResponse.json({
      success: true,
      data: polygons
    });

  } catch (error) {
    console.error('Krtsanisi polygons API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi polygons' },
      { status: 500 }
    );
  }
}