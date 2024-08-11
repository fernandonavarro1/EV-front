import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/authContext.js";

function Panel() {
    const [error, setError] = useState(null);

    const {panel, userData, loading} = useAuth();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await panel();
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los datos del perfil.</div>;
    }

    return (
        <div>
            <h3>Datos de usuario</h3>
            {userData ? (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>Fecha de nacimiento: {userData.birthday}</p>
                    <p>Edad: {userData.age}</p>
                </div>
            ) : (
                <p>No se encontraron datos de perfil.</p>
            )}
        </div>
    );
}

export default Panel;
