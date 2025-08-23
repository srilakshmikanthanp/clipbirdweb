import { List, ListItem, Skeleton } from "@mui/material";

export interface SkeletonListProps extends React.HTMLProps<HTMLDivElement> {
  rows?: number;
}

const SkeletonList = (props: SkeletonListProps) => {
  const { rows = 5, ...rest } = props;

  return (
    <div {...rest}>
      <List>
        {Array.from({ length: rows }).map((_, index) => (
          <ListItem key={index}>
            <Skeleton variant="text" width="100%" height={24} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SkeletonList;
