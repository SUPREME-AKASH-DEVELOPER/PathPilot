
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Logic for displaying page numbers with ellipsis
    if (totalPages <= 7) {
      // Less than 7 pages, show all
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 7 pages, show with ellipsis
      if (currentPage <= 4) {
        // Near the start
        pages.push(2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle area
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              disabled
              className="h-8 w-8 pointer-events-none"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }
        
        return (
          <Button
            key={index}
            variant={currentPage === pageNumber ? "default" : "outline"}
            className={`h-8 w-8 ${currentPage === pageNumber ? "bg-pp-purple hover:bg-pp-bright-purple" : ""}`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
