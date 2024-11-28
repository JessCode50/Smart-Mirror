import Image from "next/image"
const Photos = async () => {
  const min = Math.ceil(1)
  const max = Math.floor(3)
  const imageNum = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(imageNum)
  const num = imageNum.toString()
  const numStr = `/Images/image${num}.jpeg`
  return (
    <div className = "pr-3">
      <Image src={numStr} width={300} height={300} alt="photo"></Image>
    </div>
  )
}

export default Photos
