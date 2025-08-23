import axios from "axios";
import ImageResponseDto from "./ImageResponseDto";

export default class ImageAPIClient {
  private imageApiBaseUrl = `/images`;

  createPublicImage = async (file: File): Promise<ImageResponseDto> => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post<ImageResponseDto>(
      `${this.imageApiBaseUrl}/public`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  };

  getPublicImage = async (id: string): Promise<Blob> => {
    const { data } = await axios.get(`${this.imageApiBaseUrl}/public/${id}`, {
      responseType: "blob",
    });

    return data;
  };
}
