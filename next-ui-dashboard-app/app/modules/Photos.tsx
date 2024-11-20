import Image from "next/image"
const Photos = async () => {
    let min = Math.ceil(1);
    let max = Math.floor(3);
    let imageNum =  Math.floor(Math.random() * (max - min + 1)) + min
    console.log(imageNum)
    let num =  imageNum.toString()
    let numStr = `/Images/image${num}.jpeg`
    return (<div>
        <Image
            src={numStr}
            width={200}
            height={200}
            alt="photo"
        >

        </Image>
    </div>)
}

export default Photos