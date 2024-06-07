import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

console.log("si funka"); // lo agreue paraver si se se cargaba correctamente

export const registrarusuarios = async (usuarios) => {
    console.log(usuarios);
    const docRef = await addDoc(collection(db, "usuarios"), usuarios);
}

export const obtenerusuarios = async () => {
    try {
        const referencia = collection(db, 'usuarios');
        const querySnapshot = await getDocs(referencia);
        let usuarios = [];
        querySnapshot.forEach((doc) => {
            usuarios.push({ ...doc.data(), id: doc.id });
        });
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error; 
    }
};

export const actualizarusuarios = async (usuarios, id) => {
    const ref = doc(db, 'usuarios', id);
    await updateDoc(ref, usuarios);
}

export const eliminarusuarios = async (id) => {
    const ref = doc(db, 'usuarios', id);
    await deleteDoc(ref);
}

export const obtenerUsuarioActual = async (usuarioId) => {
    try {
        const usuarioRef = doc(db, 'usuarios', usuarioId);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
            return usuarioSnap.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        throw error; 
    }
};
export const editarUsuario = async (usuarioId, datosActualizados) => {
    try {
        const usuarioRef = doc(db, 'usuarios', usuarioId);
        await updateDoc(usuarioRef, datosActualizados);
    } catch (error) {
        console.error('Error al editar el usuario:', error);
        throw error;
    }
};
export const eliminarUsuario = async (usuarioId) => {
    try {
        const usuarioRef = doc(db, 'usuarios', usuarioId);
        await deleteDoc(usuarioRef);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};
