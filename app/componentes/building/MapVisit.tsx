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
    <Button onClick={() => hideMap()} text={"X"} className="bg-red-600 ml-20 p-1 px-6 rounded" />
    <div className="bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/background.png')" }}>
    <div className="flex flex-row justify-end items-end relative" >
        {buildingImages?.map((imageUrl, index) => (
          <div
            key={index}
            style={getImageStyle(imageUrl)}
            className="h-48 w-48 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-20"
          ></div>
        ))}
        </div>
    </div>
    </div>
  );
  
};

export default MapVisit;