import { Button, Checkbox, ErrorAlert, SuccessAlert } from "@/components/ui";
import { Plus, RussianRuble, Settings2, ShoppingBasket, Trash, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Api } from "../../../../../services/api-client";
import { IProducts } from "@/interface/IProducts";
import Link from "next/link";

interface IDel{
  id:number;
  color:string;
}

interface IEdit{
  id:number;
  color:string;
  type?:string;
}



export const ADelButton:FC<IDel> = (info) => {
  const handleDelete = (id:number) => {
    Api.products.productDelete(id)
  }
  return (
    <button onClick={()=>handleDelete(info.id)} className="p-2">
      <Trash className={`${info.color}`}/>
    </button>
  )
}

export const AEditButton:FC<IEdit> = (val) => {
  const router = useRouter()
  const handleEdit = (id:number) => {
    router.push(`/admin?id=${id}&type=${val.type?val.type:null}`)
  }
  return (
    <button onClick={()=>handleEdit(val.id)} className="p-2">
      <Settings2  className={`${val.color}`}/>
    </button>
  )
}

export const AButton: FC = observer(() => {
    
  const router = useRouter()

  const handleClick=()=>{
      router.push(`admin`)
  }
  return (
      <>
          <button onClick={handleClick}><Plus size={100} strokeWidth={1}/></button>
      </>
  )
})

interface IPanel{
  id?:number, 
  parentId?:number,           
  image?:string,      
  link?:string,            
  name?:string,
  description?:string, 
  price?:string,
}

interface IMessage{
  message:string;
}

export const Panel:FC = () => {
  const [message,setMessage] = useState<IMessage >({message:'',})
  const searchParams = useSearchParams()
  const [product,setProduct] = useState <IPanel | null>()
  const id: string | null  = searchParams.get("id")
  const type  = searchParams.get("type")
  id && type!='cat'? 
  useEffect(()=>{
    Api.products.info(id).then(items => {
        setProduct(items)
    })
  },[]) 
  :
  null
  
  const [categoriesName,setCategoriesName] = useState<string | null>(null)
  const [categoriesLink,setCategoriesLink] = useState<string | null>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null >(null)
  const [price, setPrice] = useState<string | null >(null)
  const [name, setName] = useState<string | null>(null);
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState<number | null>(null);
  useEffect(() => {
    setName(product?.name || null)
    setDescription(product?.description || null)
    setPrice(product?.price || null)
    setSelectedImage(product?.image || null)
    setSelectedCheckboxIndex(product?.parentId != null ? product.parentId - 1 : null)
  }, [product]);
  
  const [categories,setCategories] = useState<IProducts[] | null>([])

  const handleCategories = (items:IProducts[]) => {
    setCategories(items)
    if (type==='cat'){
      setCategoriesLink(items[parseInt(id!,10)].name)
      setCategoriesName(items[parseInt(id!,10)].link!)
    }
  }

  const handleCatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriesName(event.target.value); 
  };
  const handleCatLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriesLink(event.target.value); 
  };
  useEffect(()=>{
    Api.category.categories().then((items)=>handleCategories(items))
  },[])
  const [alert,setAlert] = useState(0)

  const handleAlert = (items:IMessage) => {
    setAlert(1)
    setMessage(items)
  }

  const handleFetch = () => {
    if (id){
      try{
      Api.products.update(Number(id),name,selectedImage,description,price,categories![selectedCheckboxIndex!].name).then((items)=>handleAlert(items)).catch(()=>setAlert(2))
      }
      catch{
        message.message=`Заполните все поля`
        setAlert(2)
      }
    }
    else{
      try{
        Api.products.create(name!,selectedImage,description!,price!,categories![selectedCheckboxIndex!].name).then((items)=>handleAlert(items)).catch(()=>setAlert(2))
      }
      catch{
        message.message=`Заполните все поля`
        setAlert(2)
      }
    }
  }

  const handleCatFetch = () => {
    Api.category.categoryUpdate(Number(id),categoriesName!,categoriesLink!).then((items)=>handleAlert(items)).catch(()=>setAlert(2))
  }

  const handleCheckboxChange = (index: number) => {
      setSelectedCheckboxIndex(index === selectedCheckboxIndex ? null : index);
    };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value); 
  };
  const handleDesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value); 
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(event.target.value); 
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    setSelectedName(file.name)
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
    };

    reader.readAsDataURL(file);
  }
  };
  
  const handleUploadClick = () => {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  console.log(categoriesName)
  return <div className={` flex flex-col  h-96 `}>
            
              <div className=" flex gap-2">
              {type!='cat'?(
                <>
                  {/* <div className=" relative flex flex-col justify-center shadow-lg shadow-gray-300  h-72 w-56 p-2  rounded-md hover:shadow-gray-400">
                    <div>
                      <div className='flex flex-col items-center justify-center rounded-xl  min-w-32 h-64'>
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-52" />
                        ) : (<div className="w-full h-52"></div>)}
                        <div className=' border-black w-52 '></div>
                        <div className="flex gap-5">
                          <div className="bg-secondary absolute top-0 left-0 flex items-center p-1.5 rounded-br-lg">
                            <h1 className="text-white break-words">{price}</h1>
                            <RussianRuble size={18} className="text-white" />
                          </div>
                          <h1 className="text-lg break-words">{name}</h1>
                          <Button style={"z-100"} onClick={() => null}>
                      
                            <ShoppingBasket />
                          </Button>
                        </div>
                        <p></p>
                      </div>
                    </div>
                  </div> */}
                    <div 
                      className={`relative border-2 bg-white  border-black rounded-xl overflow-hidden  flex flex-col justify-center  aspect-[1/1.2]  w-full  h-full  hover:shadow-gray-400`}
                      >   
                        <div  className='flex flex-col items-center  rounded-xl h-full'>
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              alt="Selected"
                              className="w-full aspect-square" />
                            ) : (<div className="w-full h-52"></div>)}
                          <div className="flex w-full h-full  justify-between items-center px-2 gap-5 py-2">
                            <div className="bg-secondary w-1/4 h-12 absolute top-0 left-0 justify-center flex items-center p-1.5 rounded-br-lg">
                              <h1 className="text-white text-xl break-words">
                                {`${price}₽`}
                              </h1>
                            </div>
                            <h1 className="text-2xl  font-bold  py-2 px-1.5   break-words">{name}</h1>
                            <Button style={"z-20 "} disabled={true} onClick={()=>null}>
                               <span className="text-xl font">Выбрать</span>
                            </Button>  
                          </div>
                        </div> 
                   </div >

                <div className="flex flex-col gap-2 w-52">
                    <div className="flex items-center">
                      <button
                        onClick={handleUploadClick}
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                      >
                        Загрузить изображение
                      </button>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden" />
                    </div>
                    {selectedImage && (
                      <div className="">
                      
                        <p>Выбранное изображение: {selectedName}</p>
                      </div>
                    )}
                    <input type="text" placeholder='имя товара ' onChange={handleNameChange} value={name!} />
                    <input type="text" placeholder='описание товара' onChange={handleDesChange} value={description!} />
                    <p className="break-words">{description}</p>
                    <input type="text" placeholder='цена товара' onChange={handlePriceChange} value={price!} />
                    <span>Категория товара</span>
                    {categories?.map((category, index) => (
                      <Checkbox
                        key={index}
                        onChange={() => handleCheckboxChange(index)}
                        checked={selectedCheckboxIndex === index}
                      >
                        <span>{category.name}</span>
                      </Checkbox>
                    ))}
                    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm" onClick={handleFetch}>{id ? "обновить" : "загрузить"}</button>
                  </div></>

            ):(
              <div className="flex flex-col gap-2">
                <p>имя категории</p>
                <input type="text" placeholder='имя категории ' onChange={handleCatNameChange} value={categoriesName!}/>
                <p>ссылка категории</p>
                <input type="text" placeholder='ссылка категории ' onChange={handleCatLinkChange} value={categoriesLink!}/>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm" onClick={handleCatFetch}>{id?"обновить":"загрузить"}</button>

              </div>
            )}
                <Link href="/">
                      <X size={40} strokeWidth={2.25}  className="text-secondary mr-10"/>
                </Link>
              </div>
              <div className="mt-2 absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3">
                {alert===1?(
                  <SuccessAlert onClick={()=>setAlert(0)}>
                    <p>{message?.message}</p>
                  </SuccessAlert>)
                  :
                  alert===2?(
                  <ErrorAlert onClick={()=>setAlert(0)}>
                    <p>{message?.message}</p>
                  </ErrorAlert>
                  )
                  :null
                  }
              </div>
            
        </div>

  }