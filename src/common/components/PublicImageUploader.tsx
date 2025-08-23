import { EditRounded, DeleteRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { placeHolder } from "common/utility/image";
import ImageAPIClient from "image/ImageAPIClient";

export interface PublicImageUploaderProps {
  url: string | null;
  alt: string;
  readonly: boolean;
  onChange: (url: string | null) => void;
}

export default function PublicImageUploader({ url, alt, onChange, readonly }: PublicImageUploaderProps) {
  const imageAPIClient = new ImageAPIClient();
  const uploadMutation = useMutation({
    mutationFn: imageAPIClient.createPublicImage,
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const data = await uploadMutation.mutateAsync(e.target.files[0]);
    onChange(data.url);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        src={url || placeHolder(150, 150, alt)}
        component="img"
        alt={alt}
        sx={{
          width: 150,
          height: 150,
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
      {!readonly && (
        <div
          className="gap-1"
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            size="small"
            tabIndex={-1}
            loading={uploadMutation.isPending}
            disabled={uploadMutation.isPending}
            startIcon={<EditRounded />}
          >
            Edit
            <input
              onChange={handleUpload}
              disabled={uploadMutation.isPending}
              type="file"
              accept="image/*"
              hidden
            />
          </Button>
          <Button
            onClick={() => onChange(null)}
            variant="contained"
            size="small"
            color="error"
            startIcon={<DeleteRounded />}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}
