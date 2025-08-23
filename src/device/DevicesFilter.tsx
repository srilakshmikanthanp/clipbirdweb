import { Button, Paper, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface DevicesFilterProps {
  onSearch: (value: string | null) => void;
  search: string | null;
}

export default function DevicesFilter(props: DevicesFilterProps) {
  const [value, setValue] = useState<string | null>(props.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim() === '' ? null : e.target.value.trim());
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onSearch(value);
    }
  };

  const clearSearchHandler = () => {
    setValue(null);
    props.onSearch(null);
  };

  return (
    <Paper
      className="p-3 mt-5 d-flex gap-3 align-items-center"
      variant="outlined"
    >
      <TextField
        onKeyDown={keyDownHandler}
        placeholder="Search Devices by name"
        fullWidth
        value={value || ''}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
      />
      <Button
        disabled={props.search == null || props.search?.length === 0}
        variant="outlined"
        onClick={clearSearchHandler}
      >
        Clear
      </Button>
    </Paper>
  );
}
