import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const buildingId = searchParams.get('building_id');
    const blockId = searchParams.get('block_id');
    const status = searchParams.get('status');
    const minArea = searchParams.get('min_area');
    const maxArea = searchParams.get('max_area');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Build dynamic query
    let query = `
      SELECT 
        a.*,
        bl.block_name,
        bl.block_number,
        b.building_name,
        b.building_id as building_code,
        p.name as project_name
      FROM krtsanisi_apartments a
      JOIN krtsanisi_blocks bl ON a.block_id = bl.id
      JOIN krtsanisi_buildings b ON a.building_id = b.id
      JOIN krtsanisi_projects p ON b.project_id = p.id
      WHERE 1=1
    `;

    const params = [];
    
    if (buildingId) {
      query += ' AND a.building_id = ?';
      params.push(buildingId);
    }
    
    if (blockId) {
      query += ' AND a.block_id = ?';
      params.push(blockId);
    }
    
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    
    if (minArea) {
      query += ' AND a.total_area >= ?';
      params.push(parseFloat(minArea));
    }
    
    if (maxArea) {
      query += ' AND a.total_area <= ?';
      params.push(parseFloat(maxArea));
    }

    query += ' ORDER BY a.building_id, a.block_id, a.apartment_number LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const apartments = await executeQuery(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM krtsanisi_apartments a
      WHERE 1=1
    `;
    const countParams = [];
    
    if (buildingId) {
      countQuery += ' AND a.building_id = ?';
      countParams.push(buildingId);
    }
    if (blockId) {
      countQuery += ' AND a.block_id = ?';
      countParams.push(blockId);
    }
    if (status) {
      countQuery += ' AND a.status = ?';
      countParams.push(status);
    }
    if (minArea) {
      countQuery += ' AND a.total_area >= ?';
      countParams.push(parseFloat(minArea));
    }
    if (maxArea) {
      countQuery += ' AND a.total_area <= ?';
      countParams.push(parseFloat(maxArea));
    }

    const [{ total }] = await executeQuery(countQuery, countParams);

    return NextResponse.json({
      success: true,
      data: apartments,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Krtsanisi apartments API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Krtsanisi apartments' },
      { status: 500 }
    );
  }
}