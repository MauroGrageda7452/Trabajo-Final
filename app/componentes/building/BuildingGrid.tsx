// BuildingGrid.tsx
import React from "react";

interface Props {
  onEmptyGroundClick: (index: number) => void;
  onBuildGroundClick: (index: number) => void;
  buildingImages: string[] | null;
  // onBuildingUpdate: (buildingImages: string[]) => void
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick,buildingImages,onBuildGroundClick}) => {

  const getImageStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center bottom', 
    backgroundRepeat: 'no-repeat',
  });

  return (
    <div className="flex flex-row">
      {buildingImages?.map((imageUrl, index) => (
        <div
          key={index}
          style={getImageStyle(imageUrl)}
          className="h-64 w-64 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-20"
          onClick={() => {
            if (buildingImages[index] !== '') {
              onBuildGroundClick(index);
            } else {
              onEmptyGroundClick(index);
            }
          }}
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;
// function onBuildingUpdate(newBuildingImages: string[]) {
//   throw new Error("Function not implemented.");
// }



  // useEffect(() => {
  //   const fetchPartidaEdificios = async () => {
  //     try {
  //       const data = await fetchSave(partidaJugadorId);
  //       const terreno = data?.terreno;
  //       if (terreno && typeof terreno === 'object') {
  //         setTerreno(terreno);
  //         const newBuildingImages = [];
  //         //const newTerrenoBool: Record<string, boolean> = {};
  //         for (const key in terreno) {
  //           if(Object.prototype.hasOwnProperty.call(terreno, key)) {
              
  //             const element = terreno[key];
  //             const edificio = edificios.find(edificio => edificio.id === element);
  //             if (edificio) {
  //               newBuildingImages.push(edificio.imagen);
  //               terrenoBool[key] = true;
  //             }else{
  //               newBuildingImages.push('');
  //               terrenoBool[key] = false;
  //             }
  //           } 
  //         }
  //         onBuildingUpdate(newBuildingImages); // Update the buildingImages state in Map
  //         setTerrenoBool(terrenoBool);
          
          
  //       } else {
  //         setTerreno({});
  //         onBuildingUpdate([]);
  //         setTerrenoBool({});
  //       }       
      
  //       }catch (error) {
  //       console.error("Error al cargar los datos de la partida:", error);
  //     }
  //   };
  //   fetchPartidaEdificios();
  // }, [edificios]);