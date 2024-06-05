Que cambios estuve haciendo:

le cmabie el nombre al archivo layaout.tsx a RootLayaout.tsx. para señalar que es la raiz.

service a services

Así lo estaba pensando:
    // Componente Recursos
    const Recursos = () => {
    // Lógica y visualización de la lista de recursos
    };

    // Componente Edificios
    const Edificios = () => {
    // Lógica y visualización de los edificios
    };

    // Componente Botones de Edificios
    const BotonesEdificios = () => {
    // Visualización y lógica de los botones de edificios
    };

    // Componente de Construcción
    const Construccion = () => {
    // Lógica de construcción de edificios
    };

    // Componente de Carga de Datos
    const CargaDeDatos = () => {
    // Lógica de carga de datos al montar el componente
    };

    // Componente de Mapa (engloba todos los componentes anteriores)
    const Mapa = () => {
    // Lógica y visualización del mapa
    return (
        <div>
        <Recursos />
        <Edificios />
        <BotonesEdificios />
        <Construccion />
        <CargaDeDatos />
        </div>
    );
    };
