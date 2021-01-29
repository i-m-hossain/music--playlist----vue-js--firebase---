
import { ref } from 'vue'
import { projectStorage } from '../firebase/config'


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
            url.value = res.ref.getDownloadURL() 
                
        } catch (err) {
            console.log(err.message)
            error.value = err.message 
        }

    }

    return { error, url, filePath, uploadImage }
}


export default useStorage