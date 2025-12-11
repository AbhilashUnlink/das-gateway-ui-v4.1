export default interface Column {
    field?: string;
    label: string;
    minWidth?: number;
    visible?:boolean;
    align?: 'right' | 'left' | 'center';
  } 

  export  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
