import React from 'react';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`skeleton-shimmer rounded-md ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="card p-6 w-full">
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="table-container">
    <div className="flex p-4 border-b border-gray-100 gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex p-4 border-b border-gray-50 gap-4">
        {[1, 2, 3, 4, 5].map((j) => (
          <Skeleton key={j} className="h-3 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="mb-8">
    <Skeleton className="h-8 w-[250px] mb-2" />
    <Skeleton className="h-4 w-[400px]" />
  </div>
);
