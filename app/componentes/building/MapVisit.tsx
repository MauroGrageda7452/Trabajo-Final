import React from "react";
import Button from "../ui/Button";

interface Props {
  buildingImages: string[] | null;
  hideMap: () => void;
  // onBuildingUpdate: (buildingImages: string[]) => void
}

const MapVisit: React.FC<Props> = ({buildingImages, hideMap}) => {

  const getImageStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center bottom', 
    backgroundRepeat: 'no-repeat',
  });

  return (
    <div>
      <div className="bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/background.png')", height: '750%' }}>
        <div className="flex flex-row justify-end items-end relative">
            {buildingImages?.map((imageUrl, index) => (
                <div
                    key={index}
                    style={getImageStyle(imageUrl)}
                    className="h-64 w-64 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-20 m-2"
                ></div>
                ))}
            </div>
        </div>
      <Button onClick={() => hideMap()} text={"X"} className="bg-red-600 ml-1 p-1 px-6 rounded" />
    </div>
  );
};

export default MapVisit;