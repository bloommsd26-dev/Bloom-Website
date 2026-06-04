import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types';

export function successResponse<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    } as ApiResponse<T>,
    { status }
  );
}

export function errorResponse(error: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error,
    } as ApiResponse,
    { status }
  );
}

export function validationError(message: string) {
  return errorResponse(message, 400);
}

export function notFoundError(message: string = 'Resource not found') {
  return errorResponse(message, 404);
}

export function unauthorizedError(message: string = 'Unauthorized') {
  return errorResponse(message, 401);
}

export function forbiddenError(message: string = 'Forbidden') {
  return errorResponse(message, 403);
}

export function serverError(message: string = 'Internal server error') {
  return errorResponse(message, 500);
}

export function paginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  const pages = Math.ceil(total / limit);

  return NextResponse.json(
    {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        pages,
      },
    },
    { status: 200 }
  );
}
