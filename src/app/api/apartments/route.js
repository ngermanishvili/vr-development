import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

// GET /api/apartments - Get all apartments with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const blockId = searchParams.get('block_id');
    const blockCode = searchParams.get('block_code');
    const floor = searchParams.get('floor');
    const status = searchParams.get('status');
    const apartmentType = searchParams.get('apartment_type');
    const minArea = searchParams.get('min_area');
    const maxArea = searchParams.get('max_area');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Build dynamic query
    let query = `
      SELECT 
        a.*,
        b.block_name,
        b.block_code,
        p.name as project_name,
        f.coords as floor_coordinates
      FROM apartments a
      JOIN blocks b ON a.block_id = b.id
      JOIN projects p ON b.project_id = p.id
      LEFT JOIN floors f ON a.block_id = f.block_id AND a.floor = f.floor_number
      WHERE 1=1
    `;

    const params = [];
    
    if (blockId) {
      query += ' AND a.block_id = ?';
      params.push(blockId);
    }
    
    if (blockCode) {
      query += ' AND a.block_code = ?';
      params.push(blockCode);
    }
    
    if (floor) {
      query += ' AND a.floor = ?';
      params.push(floor);
    }
    
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    
    if (apartmentType) {
      query += ' AND a.apartment_type = ?';
      params.push(apartmentType);
    }
    
    if (minArea) {
      query += ' AND a.total_area >= ?';
      params.push(parseFloat(minArea));
    }
    
    if (maxArea) {
      query += ' AND a.total_area <= ?';
      params.push(parseFloat(maxArea));
    }

    query += ' ORDER BY a.block_id, a.floor, a.apartment_number LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const apartments = await executeQuery(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM apartments a
      WHERE 1=1
    `;
    const countParams = [];
    
    if (blockId) {
      countQuery += ' AND a.block_id = ?';
      countParams.push(blockId);
    }
    if (blockCode) {
      countQuery += ' AND a.block_code = ?';
      countParams.push(blockCode);
    }
    if (floor) {
      countQuery += ' AND a.floor = ?';
      countParams.push(floor);
    }
    if (status) {
      countQuery += ' AND a.status = ?';
      countParams.push(status);
    }
    if (apartmentType) {
      countQuery += ' AND a.apartment_type = ?';
      countParams.push(apartmentType);
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
    console.error('Apartments API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apartments' },
      { status: 500 }
    );
  }
}