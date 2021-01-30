
import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from '@/composables/getUser'


const { user } = getUser()

const useStorage = () => {

    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
   

    const uploadImage= async(file) => {
        
        filePath.value = `covers/${user.value.uid}/${file.name}`    // backtick is used to define a string
        const storageRef = projectStorage.ref(filePath.value)

        //now upload the image using put method

        try {

            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL() 
                
        } catch (err) {
            console.log(err.message)
            error.value = err.message 
        }

    }
    const deleteImage = async (path) => {
        
        console.log(path);
        
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete()
            
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage, deleteImage }
}


export default useStorage