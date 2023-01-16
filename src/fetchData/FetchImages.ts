import { getStorage, ref, listAll } from "firebase/storage";

export const fetchImages = async () => {  
    const storage = getStorage();
    const newImage: string[] = [];
    try {
        const res = await listAll(ref(storage, `files`));
        res.prefixes.forEach(async (folderRef) => {
            try {
                const res = await listAll(folderRef);
                res.items.forEach((itemRef) => {
                    newImage.push(itemRef.fullPath);  
                });        
            } catch {
                console.log('error');
            }
        });
        return newImage;    
    } catch {
        console.log('error'); 
    } 
}