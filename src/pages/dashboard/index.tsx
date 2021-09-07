import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Input from '@components/ui/input';
import TextArea from "@components/ui/text-area";
import Select from 'react-select';
import { Divider } from '@material-ui/core';
import { CheckBox } from "@components/ui/checkbox";


const categoria = [
    {value: '1', label: 'Cachorros'},
    {value: '2', label: 'Gatos'},
    {value: '3', label: 'Peixes'},
    {value: '4', label: 'Outros Pets'},
    {value: '5', label: 'Pet Lovers'}, 
]

const styles = {
    control: (base: any) => ({
      ...base,
      fontSize: "12px",
      fontFamily: "Open Sans",
      color: "#333",
      textTransform: "uppercase",
      margin: '0 auto',
      width: '200px'
    }),
    menu: (base: any) => ({
        ...base,
        fontSize: "12px",
        letterSpacing: "0.08em",
        zIndex: "999999999 !important",
        width: '200px'
        
    })
  };

const useStyles = makeStyles((theme) => ({
    root: {
        width: 380,
        display: 'inline-block',
        margin: '10px'
    },
    media: {
      height: 250,
    },
    appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      
  }));


  
  function dateRFC3339toMDY(date: string | number | Date){
   
    function pad(n: string | number){return n<10 ? '0'+n : n}

    var cdate = new Date(date)

    return  pad(cdate.getDate()) +"/" +pad(cdate.getMonth()+1)+ "/" + cdate.getFullYear()
}


export default function Dashboard() {


    const classes = useStyles();

    // ADD
    const [openAdd, setOpenAdd] = useState(false);

    const [categoriaComboSelectionAdd, setCategoriaComboSelectionAdd] = useState([])
    const [subcategoriaComboSelectionAdd, setSubcategoriaComboSelectionAdd] = useState([])
    const [subcategoriesAdd, setsubCategoriesAdd] = useState<any[]>([])

    var [addTitulo, setAddTitulo] = useState("")
    var [addDescricao, setAddDescricao] = useState("")
    var [addLinkAfiliado, setAddLinkAfiliado] = useState("")
    var [addObservacao, setAddObservacao] = useState("")
    var [addPreco, setAddPreco] = useState("")
    var [addCategoria, setAddCategoria] = useState([])
    var [addSubcategoriaId, setAddSubcategoriaId] = useState(0)
    var [addSubcategoria, setAddSubcategoria] = useState([])
    var [addImageLink, setAddImageLink] =useState("")
    var [addImageUpload, setAddImageUpload] = useState("")
    var [addImageUploadExtension, setAddImageUploadExtension] = useState("")
    var [addImageUploadDestaque, setAddImageUploadDestaque] = useState("")
    var [addImageUploadDestaqueExtension, setAddImageUploadDestaqueExtension] = useState("")
    var [addCheckedMaiorComissao, setAddCheckedMaiorComissao] = useState(false)
    var [addCheckedDestaque, setAddCheckedDestaque] = useState(false)


    // EDIT
    const [categoriaComboSelection, setCategoriaComboSelection] = useState({})
    const [subcategoriaComboSelection, setSubcategoriaComboSelection] = useState({})
    const [subcategories, setsubCategories] = useState<any[]>([])
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [canAccess, setCanAccess] = useState(false)
    const [countPages, setCountPages] = useState(0)
    var [showNoMoreProducts, setShowNoMoreProducts] = useState(false)

    var [editId, setEditId] = useState(0)
    var [editTitulo, setEditTitulo] = useState("")
    var [editDescricao, setEditDescricao] = useState("")
    var [editLinkAfiliado, setEditLinkAfiliado] = useState("")
    var [editObservacao, setEditObservacao] = useState("")
    var [editPreco, setEditPreco] = useState("")
    var [editCategoria, setEditCategoria] = useState({})
    var [editSubcategoriaId, setEditSubcategoriaId] = useState(0)
    var [editSubcategoria, setEditSubcategoria] = useState({})
    var [editImageLink, setEditImageLink] =useState("")
    var [editImageUpload, setEditImageUpload] = useState("")
    var [editImageUploadExtension, setEditImageUploadExtension] = useState("")
    var [editImageUploadDestaque, setEditImageUploadDestaque] = useState("")
    var [editImageUploadDestaqueExtension, setEditImageUploadDestaqueExtension] = useState("")
    var [editCheckedMaiorComissao, setEditCheckedMaiorComissao] = useState(false)
    var [editCheckedDestaque, setEditCheckedDestaque] = useState(false)
   

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // ADD
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    const handleChangeTituloAdd = (event) => {
        setAddTitulo(event.target.value)
     } 
 
     const handleChangeDescricaoAdd = (event) => {
         setAddDescricao(event.target.value)
     } 
 
     const handleChangeLinkAfiliadoAdd = (event) => {
         setAddLinkAfiliado(event.target.value)
     } 
 
     const handleChangeObservacaoAdd= (event) => {
         setAddObservacao(event.target.value)
     } 
 
     const handleChangePrecoAdd = (event) => {
         setAddPreco(event.target.value)
     } 
 
     const handleImageLinkAdd = (event) => {
         setAddImageLink(event.target.value)
     } 
 
 
     const handleUploadImageAdd = (event) =>{
         setAddImageUploadExtension(event.target.files[0].name.split('.')[1])
         const url = event.target.files[0]
         setAddImageUpload(url)
     }
 
     const handleUploadImgDestaqueAdd = (event) =>{
         setAddImageUploadDestaqueExtension(event.target.files[0].name.split('.')[1])
         const url = event.target.files[0]
         setAddImageUploadDestaque(url)
     }
 
 
     const handleCheckMaiorComissaoAdd = () => {
         setAddCheckedMaiorComissao(!addCheckedMaiorComissao)
     }
 
     const handleCheckDestaqueAdd = () => {
         setAddCheckedDestaque(!addCheckedDestaque)
     }

  
     const handleSubCategoryAdd = (e) =>{
        setAddSubcategoria(e.label)
        setAddSubcategoriaId(e.value)
        setSubcategoriaComboSelectionAdd(e)
    }

   const handleCategoryAdd = (e) =>{
        setAddCategoria(e.label)
        setCategoriaComboSelectionAdd(e)
        setsubCategoriesAdd([])
        setAddSubcategoria([])
        
       
        // busca todas as subcategorias GETSUBCATEGORIAS
        if(e.value !== null && e.value !== "" && e.value !== undefined){

            const params = {
                categoria: e.value
            }

            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETSUBCATEGORIAS, params)
			.then(res => {
				
				if(res.status === 200 && res.data.length > 0){
					Object.keys(res.data).forEach(function(key) {
					
						var line = {label: res.data[key].name, value: res.data[key].id}
                        setsubCategoriesAdd(subcategoriesAdd => [...subcategoriesAdd, line])
					})
				} 
				
			}).catch(err => {
				// nothing here
                console.log(err)
            })
        }


   }


    const addProd = () =>{
        setOpenAdd(true)
    }


    const handleCloseAdd = () => {
        setOpenAdd(false);
        window.location.reload(true)   
    };

    const handleSubmitAdd = () => {
        
        if(addTitulo !== "" && addLinkAfiliado !== "" && addPreco !== ""){


            var params = {
                 titulo: addTitulo,
                 descricao: addDescricao,
                 linkafiliado: addLinkAfiliado,
                 observacao: addObservacao,
                 preco: addPreco.toString().replace(',','.'),
                 categoria: addCategoria,
                 subcategoria: addSubcategoria,
                 image_link: addImageLink,
                 is_destaque: addCheckedDestaque,
                 is_maior_comissao: addCheckedMaiorComissao,
                 photo_ext_product: addImageUploadExtension,
                 photo_ext_destaque: addImageUploadDestaqueExtension,
                 subcategoria_id: addSubcategoriaId
             }

           
 
             Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.DASHADDPROD, params)
             .then(res => {
              
 
                 if(res.data.affectedRows === 1){
 
 
                     alert("Os dados do produto foram salvos com sucesso")
 
                     // IMAGEM NORMAL DO PRODUTO
                     if(addImageUpload !== ""){
                                         
                         // vai tentar salvar a imagem do produto
                         try {
                             var filename = `${res.data.insertId}.${addImageUploadExtension}`
                             
                            

                             const formData = new FormData();
                             formData.append('file',  addImageUpload, filename);
                             formData.append('type', 'product')
                             
                             Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.SAVEPHOTO, formData)
                             .then(res => {
                                console.log('product')
                               console.log(res)
                                
                            }).catch(err => {
                                // nothing here
                                console.log(err)
                            })
                             
                         
                         } catch (err) {
                             alert("A imagem do produto não foi enviada")
                         }
                     } 
 
 
                     // IMAGEM DE DESTAQUE
                     // caso deu check no destaque, tenta salvar a image que fez upload
                     // caso não inseriu, cria um alert
                     if(addCheckedDestaque){
                         if(addImageUploadDestaque !== ""){
                         
                             // vai tentar salvar a imagem de destaque
                             try {
                                 var filename = `${res.data.insertId}.${addImageUploadDestaqueExtension}`
                                 
                                

                                 const formData = new FormData();
                                 formData.append('file',  addImageUploadDestaque, filename);
                                 formData.append('type', 'highlight')
                                 Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.SAVEPHOTO, formData)
                                 .then(res => {
                                    console.log('highlight')
                                 console.log(res)
                                    
                                }).catch(err => {
                                    // nothing here
                                    console.log(err)
                                })
                             
                             } catch (err) {
                                 alert("A imagem do banner de destaque não foi enviada")
                             }
                         } 
                     }
                 } else {
                     alert("A alteração não foi salva.")
                 }
                 
 
                
             }).catch(err => {
                 // nothing here
                 console.log(err)
             })
 
 
         } else {
             alert("Precisa preencher pelo menos titulo, preço e link afiliado")
         }
    }



    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // EDIT
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 


    const handleSubCategory = (e) =>{
        setEditSubcategoria(e.label)
        setEditSubcategoriaId(e.value)
        setSubcategoriaComboSelection(e)
    }

   const handleCategory = (e) =>{
        setEditCategoria(e.label)
        setCategoriaComboSelection(e)
        setsubCategories([])
        setEditSubcategoria("")
        
       
        // busca todas as subcategorias GETSUBCATEGORIAS
        if(e.value !== null && e.value !== "" && e.value !== undefined){

            const params = {
                categoria: e.value
            }

            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETSUBCATEGORIAS, params)
			.then(res => {
				
				if(res.status === 200 && res.data.length > 0){
					Object.keys(res.data).forEach(function(key) {
					
						var line = {label: res.data[key].name, value: res.data[key].id}
                        setsubCategories(subcategories => [...subcategories, line])
					})
				} 
				
			}).catch(err => {
				// nothing here
                console.log(err)
            })
        }


   }

    const handleClose = () => {
        setOpen(false);
        window.location.reload()   
    };



    const handleSubmit = () =>{
       
  
        // editing
        if(editId > 0 && editTitulo !== "" && editLinkAfiliado !== "" && editPreco !== ""){


           var params = {
                id: editId,
                titulo: editTitulo,
                descricao: editDescricao,
                linkafiliado: editLinkAfiliado,
                observacao: editObservacao,
                preco: editPreco.toString().replace(',','.'),
                categoria: editCategoria,
                subcategoria: editSubcategoria,
                image_link: editImageLink,
                is_destaque: editCheckedDestaque,
                is_maior_comissao: editCheckedMaiorComissao,
                photo_ext_product: editImageUploadExtension,
                photo_ext_destaque: editImageUploadDestaqueExtension,
                subcategoria_id: editSubcategoriaId
            }

            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.DASHEDITPROD, params)
            .then(res => {

                if(res.data.affectedRows === 1){


                    alert("Os dados do produto foram salvos com sucesso")

                    // IMAGEM NORMAL DO PRODUTO
                    if(editImageUpload !== ""){
                                        
                        // vai tentar salvar a imagem do produto
                        try {
                            var filename = `${editId}.${editImageUploadExtension}`
                            
                            const formData = new FormData();
                            formData.append('file',  editImageUpload, filename);
                            formData.append('type', 'product')
                            
                            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.SAVEPHOTO, formData)
                            .then(res => {
                                console.log('product')
                               console.log(res)
                                
                            }).catch(err => {
                                // nothing here
                                
                                console.log(err)
                            })
                        
                        } catch (err) {
                            alert("A imagem do produto não foi enviada")
                        }
                    } 


                    // IMAGEM DE DESTAQUE
                    // caso deu check no destaque, tenta salvar a image que fez upload
                    // caso não inseriu, cria um alert
                    if(editCheckedDestaque){
                        if(editImageUploadDestaque !== ""){
                        
                            // vai tentar salvar a imagem de destaque
                            try {
                                var filename = `${editId}.${editImageUploadDestaqueExtension}`
                                
                                const formData = new FormData();
                                formData.append('file',  editImageUploadDestaque, filename);
                                formData.append('type', 'highlight')
                                Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.SAVEPHOTO, formData)
                                .then(res => {
                                console.log('highlight')
                                  console.log(res)
                                    
                                }).catch(err => {
                                    // nothing here
                                    console.log(err)
                                })
                            
                            } catch (err) {
                                alert("A imagem do banner de destaque não foi enviada")
                            }
                        } 
                    }
                } else {
                    alert("A alteração não foi salva.")
                }
                

               
            }).catch(err => {
                // nothing here
                console.log(err)
            })


        } else {
            alert("Precisa preencher pelo menos titulo, preço e link afiliado")
        }
    }


    const myRef = React.createRef() as React.MutableRefObject<HTMLInputElement>;;
    const fetchNextPage = (ref) => {
		ref.current.scrollIntoView({behavior: 'smooth'})
		const newCount = countPages + 1
		setCountPages(newCount)
	}


   
    // ----------
    // EDIT
    // -----------
    const editProd = (id: number) => {




        if(id > 0){
            setOpen(true)
            // search on array of objects
            products.filter(product => 
                product.id == id).map(filteredProduct => (
                    
                    setEditId(filteredProduct.id),
                    setEditTitulo(filteredProduct.name),
                    setEditDescricao(filteredProduct.description),
                    setEditLinkAfiliado(filteredProduct.link),
                    setEditObservacao(filteredProduct.observacao),
                    setEditImageLink(filteredProduct.image_link),
                    setEditPreco(filteredProduct.price),
                    setEditCategoria(filteredProduct.categoria),
                    setEditSubcategoria(filteredProduct.subcategoria),
                    setEditCheckedDestaque(filteredProduct.top_banner),
                    setEditCheckedMaiorComissao(filteredProduct.maior_comissao),
                    setEditImageUpload(""),
                    setEditImageUploadDestaque(""),
                    setEditImageUploadExtension(filteredProduct.photo_ext),
                    setEditImageUploadDestaqueExtension(filteredProduct.photo_ext_destaque),
                    setEditSubcategoriaId(filteredProduct.subcategoria_id)
                )
            )
        }

    }

    // -----------
    // DELETE
    // -----------
    const deleteProd = (id: number) => {
        
        if(id !== null && id !== undefined && id > 0){

            const params = {
                prod_id: id
            }

            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.DASHDELETEPROD, params)
            .then(res => {

                if(res.data.affectedRows === 1){
                    window.location.reload(true)   
                } else {
                    alert("Não foi deletado")
                }
                

            }).catch(err => {
                // nothing here
                console.log(err)
            })
        }
    }



   

    const handleChangeTitulo = (event) => {
       setEditTitulo(event.target.value)
    } 

    const handleChangeDescricao = (event) => {
        setEditDescricao(event.target.value)
    } 

    const handleChangeLinkAfiliado = (event) => {
        setEditLinkAfiliado(event.target.value)
    } 

    const handleChangeObservacao = (event) => {
        setEditObservacao(event.target.value)
    } 

    const handleChangePreco = (event) => {
        setEditPreco(event.target.value)
    } 

    const handleImageLink = (event) => {
        setEditImageLink(event.target.value)
    } 


    const handleUploadImage = (event) =>{
        setEditImageUploadExtension(event.target.files[0].name.split('.')[1])
        const url = event.target.files[0]
        setEditImageUpload(url)
    }

    const handleUploadImgDestaque = (event) =>{
        setEditImageUploadDestaqueExtension(event.target.files[0].name.split('.')[1])
        const url = event.target.files[0]
        setEditImageUploadDestaque(url)
    }


    const handleCheckMaiorComissao = () => {
        setEditCheckedMaiorComissao(!editCheckedMaiorComissao)
    }

    const handleCheckDestaque = () => {
        setEditCheckedDestaque(!editCheckedDestaque)
    }
 



    useEffect(() => {
        if(sessionStorage.getItem('permission') && sessionStorage.getItem('permission') === "yes"){
            setProducts([])
            setCanAccess(true)
           
            const params = {
                page_count: countPages
            }
        
            Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.DASHALLPRODS, params)
            .then(res => {
                
                if(res.status !== 200){
                    setShowNoMoreProducts(true)
                }

                if(res.status === 200 && res.data.length > 0){
                    Object.keys(res.data).forEach(function(key) {
                        
                        let image = res.data[key].image_link
                        if(image === null || image === ""){
                            image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[key].id}.${res.data[key].photo_ext}`
                        }
                 
                        var prod = {
                            id: res.data[key].id,
                            name: res.data[key].product_name,
                            description: res.data[key].description,
                            observacao: res.data[key].observacao,
                            image_link: res.data[key].image_link,
                            slug: res.data[key].id,
                            link: res.data[key].link,
                            date: res.data[key].time,
                            top_banner: res.data[key].is_top_banner,
                            maior_comissao: res.data[key].maior_comissao,
                            image: {
                                id: res.data[key].id,
                                thumbnail: {url: image, width: '480', height: '275'},
                                original: {url: image, width: '1800', height: '800'}
                            },
                            price: res.data[key].price,
                            sale_price: res.data[key].price,
                            variations: [],
                            categoria: res.data[key].categoria,
                            categoria_link: res.data[key].macrocategorias_link,
                            subcategoria: res.data[key].subcategoria,
                            subcategoria_link: res.data[key].subcategoria_link,
                            subcategoria_id: res.data[key].subcategoria_id,
                            photo_ext: res.data[key].photo_ext,
                            photo_ext_destaque: res.data[key].photo_ext_destaque
                        }
                        setProducts(products => [...products, prod])
                    })
                    
                } 

               
            }).catch(err => {
                // nothing here
                console.log(err)
            })
        } else {
            window.location.href = '/signin'
        }

    }, [countPages]);




    return (
        <>
        {canAccess &&
        <>
        <div>
            <br />
            &nbsp;&nbsp;&nbsp;
            <Button onClick={addProd} style={{margin: '20px!important',  background: 'purple', color: 'white', fontWeight: 800}}>
                Adicionar novo produto
            </Button> &nbsp;
          
            <br /><br />
        </div>
        <div ref={myRef} className="border-t-2 border-borderBottom">
            {products.length > 0 && 
            <>
            {products.map((prods) => ( 
                <Card className={classes.root} key={prods.id}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={prods.image.thumbnail.url}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {prods.name}
                    </Typography>
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Descrição: </strong> {prods.description ? `${prods.description.substring(0,100)} (...)` : 'Não'}
                    </Typography>
                    
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Preço: </strong>{prods.price ? parseFloat(prods?.price).toFixed(2) : 'Não'}  
                    </Typography>
                    
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Link afiliado: </strong> {prods.link ?  prods.link : 'Não '} 
                    </Typography>
                   
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Observação: </strong> {prods.observacao ? `${prods.observacao.substring(0,70)} (...)` : 'Não'} 
                    </Typography>
                    
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Destaque? </strong> {prods.top_banner === 1 ? 'Sim' : 'Não'} 
                    </Typography>
                    
                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Mais Acessados? </strong> {prods.maior_comissao === 1 ? 'Sim' : 'Não'} 
                    </Typography>

                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                        <strong>Data: </strong> {dateRFC3339toMDY(prods.date)}
                    </Typography>

                    <Typography style={{paddingTop: "5px"}} variant="body2" color="textSecondary" component="p">
                      <strong>Categoria: </strong>{prods.categoria} / {prods.subcategoria}
                    </Typography>
                    
                   
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button 
                        onClick={() => editProd(prods.id) }
                        size="small" color="primary">
                    Editar
                    </Button>
                    <Button 
                        onClick={() => { if (window.confirm('Tem certeza que quer excluir?')) deleteProd(prods.id) } }
                        size="small" color="primary">
                    Excluir
                    </Button>
                </CardActions>
                </Card>
            ))}
            </>
            }
           
        </div>
        
        {showNoMoreProducts &&
        <div style={{textAlign: 'center', marginTop: '30px', fontSize: '30px'}}>
            Não tem mais produto para visualizar
        </div>
            
        }
        {products.length > 0 &&
        <div className="text-center pt-8 xl:pt-14">
				<Button
						onClick={() => fetchNextPage(myRef)}
						style={{padding: '12px', background: 'purple', color: 'white', fontWeight: 800, margin: '15px 5px!important'}}
					>
						CLIQUE PARA CARREGAR MAIS PRODUTOS
				</Button>
                <br /><br /><br />
        </div>
        
        }

        {/* EDITTT */}
        <Dialog fullScreen open={open} onClose={handleClose}>
            <>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Editando: <strong>{editTitulo}</strong>
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                SALVAR ALTERAÇÕES
                </Button>
            </Toolbar>
            </AppBar>
            <List>
            <form
				//onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
            <br />
            <ListItem>
            <Input
                labelKey="Título do Produto (Obrigatório)"
                variant="solid"
                name="titulo"
                className="w-full sm:w-1/2"
                value={editTitulo}
                onChange={handleChangeTitulo}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <TextArea
                labelKey="Descrição do Produto"
                variant="solid"
                name="descricao"
                className="w-full sm:w-1/2"
                value={editDescricao}
                onChange={handleChangeDescricao}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <Input
                labelKey="Link Afiliado  (Obrigatório). Obs: Começa com http:// ou https://"
                variant="solid"
                name="afiliado"
                className="w-full sm:w-1/2"
                value={editLinkAfiliado}
                onChange={handleChangeLinkAfiliado}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <TextArea
                labelKey="Observação"
                name="observacao"
                value={editObservacao}
                onChange={handleChangeObservacao}
                style={{width: '600px', height: '150px'}}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <Input
                labelKey="Preço  (Obrigatório)"
                variant="solid"
                name="preco"
                className="w-full sm:w-1/6"
                value={editPreco}
                onChange={handleChangePreco}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
           Categoria: &nbsp; &nbsp; <Select
                options={categoria}
                value={categoriaComboSelection}
                onChange={handleCategory}
                styles={styles}
            /> 
            &nbsp; &nbsp;Seleção Atual: &nbsp;<strong>{editCategoria}</strong>
           
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
                Subcategoria 
            &nbsp; &nbsp; <Select
                options={subcategories}
                value={subcategoriaComboSelection}
                onChange={handleSubCategory}
                styles={styles}
            /> 
             &nbsp; &nbsp;Seleção Atual: &nbsp;<strong>{editSubcategoria}</strong>
           
            </ListItem>
           <br />
            <Divider/>
            <br />
            <ListItem>
               
                
                <Input
                labelKey="Insira aqui o link da imagem (se houver)"
                variant="solid"
                name="link_imagem"
                className="w-full sm:w-1/2"
                value={editImageLink}
                onChange={handleImageLink}
                //errorKey={errors.firstName?.message}
                />

            </ListItem>
            <span style={{padding: '10px', fontSize: '15px', fontWeight: 500}}>
                Ou clique aqui para inserir uma imagem que você fez no canva (tamanho normal):
            </span>
            <ListItem>
                <Input type="file" name="upload_image" onChange={handleUploadImage} />
            </ListItem>
            <br  />
            <Divider />
            <br />
            <ListItem>
                <CheckBox checked={editCheckedMaiorComissao}  onChange={handleCheckMaiorComissao} name="maior_comissao"  labelKey="Maior Comissão //// (Quer que esse produto apareça na seção dos MAIS ACESSADOS?  Então selecione a caixinha do lado esquerdo. )" /> 
            </ListItem>
            <ListItem>
                <CheckBox checked={editCheckedDestaque} onChange={handleCheckDestaque} name="destaque"  labelKey=" Destaque /// Aparecerá no banner rotativo, grande, lá em cima do site. Caso sim, selecione a caixinha do lado esquerdo"/> 
                
            </ListItem>
                
           
            <span style={{padding: '10px'}}>Lembre que as fotos que aparecem no destaque precisam ser feitas no Canva e colocadas aqui também. 
            <br />
            Então se <strong>VOCÊ CLICOU EM "DESTAQUE" </strong>, insira o banner (grande) que você fez no canva e vai ficar girando na página inicial.<br />
            </span>
            <ListItem>
                <Input type="file" name="upload_destaque" onChange={handleUploadImgDestaque} />
            </ListItem>
         
          
            <br />
            <br />
            <span style={{textAlign: 'center', padding: '10px', background: '#FF6B6B'}}> Para salvar, role para cima e clique no "salvar alterações" no canto superior direito </span> 
            </form>
            </List>
            </>
            
        </Dialog>


        {/* ADDDD */}
        <Dialog fullScreen open={openAdd} onClose={handleCloseAdd}>
            <>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleCloseAdd} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Adicionando: <strong>{addTitulo}</strong>
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmitAdd}>
                SALVAR ALTERAÇÕES
                </Button>
            </Toolbar>
            </AppBar>
            <List>
            <form
				//onSubmit={handleSubmitAdd(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
            <br />
            <ListItem>
            <Input
                labelKey="Título do Produto (Obrigatório)"
                variant="solid"
                name="titulo"
                className="w-full sm:w-1/2"
                value={addTitulo}
                onChange={handleChangeTituloAdd}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <TextArea
                labelKey="Descrição do Produto"
                variant="solid"
                name="descricao"
                className="w-full sm:w-1/2"
                value={addDescricao}
                onChange={handleChangeDescricaoAdd}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <Input
                labelKey="Link Afiliado  (Obrigatório). Obs: Começa com http:// ou https://"
                variant="solid"
                name="afiliado"
                className="w-full sm:w-1/2"
                value={addLinkAfiliado}
                onChange={handleChangeLinkAfiliadoAdd}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <TextArea
                labelKey="Observação"
                name="observacao"
                value={addObservacao}
                onChange={handleChangeObservacaoAdd}
                style={{width: '600px', height: '150px'}}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
            <Input
                labelKey="Preço  (Obrigatório)"
                variant="solid"
                name="preco"
                className="w-full sm:w-1/6"
                value={addPreco}
                onChange={handleChangePrecoAdd}
                //errorKey={errors.firstName?.message}
            />
            </ListItem>
            <br />
            <Divider/>
            <br />
            <ListItem>
           Categoria: &nbsp; &nbsp; <Select
                options={categoria}
                value={categoriaComboSelectionAdd}
                onChange={handleCategoryAdd}
                styles={styles}
            /> 
            &nbsp; &nbsp;Seleção Atual: &nbsp;<strong>{addCategoria}</strong>
           
            </ListItem>
           <br />
            <Divider/>
            <br />
            <ListItem>
                Subcategoria 
            &nbsp; &nbsp; <Select
                options={subcategoriesAdd}
                value={subcategoriaComboSelectionAdd}
                onChange={handleSubCategoryAdd}
                styles={styles}
            /> 
             &nbsp; &nbsp;Seleção Atual: &nbsp;<strong>{addSubcategoria}</strong>
           
            </ListItem>
           <br />
            <Divider/>
            <br />
            <ListItem>
               
                
                <Input
                labelKey="Insira aqui o link da imagem (se houver)"
                variant="solid"
                name="link_imagem"
                className="w-full sm:w-1/2"
                value={addImageLink}
                onChange={handleImageLinkAdd}
                //errorKey={errors.firstName?.message}
                />

            </ListItem>
            <span style={{padding: '10px', fontSize: '15px', fontWeight: 500}}>
                Ou clique aqui para inserir uma imagem que você fez no canva (tamanho normal):
            </span>
            <ListItem>
                <Input type="file" name="upload_image" onChange={handleUploadImageAdd} />
            </ListItem>
            <br  />
            <Divider />
            <br />
            <ListItem>
                <CheckBox checked={addCheckedMaiorComissao}  onChange={handleCheckMaiorComissaoAdd} name="maior_comissao"  labelKey="Maior Comissão //// (Quer que esse produto apareça na seção dos MAIS ACESSADOS?  Então selecione a caixinha do lado esquerdo. )" /> 
            </ListItem>
            <ListItem>
                <CheckBox checked={addCheckedDestaque} onChange={handleCheckDestaqueAdd} name="destaque"  labelKey=" Destaque /// Aparecerá no banner rotativo, grande, lá em cima do site. Caso sim, selecione a caixinha do lado esquerdo"/> 
                
            </ListItem>
                
           
            <span style={{padding: '10px'}}>Lembre que as fotos que aparecem no destaque precisam ser feitas no Canva e colocadas aqui também. 
            <br />
            Então se <strong>VOCÊ CLICOU EM "DESTAQUE" </strong>, insira o banner (grande) que você fez no canva e vai ficar girando na página inicial.<br />
            </span>
            <ListItem>
                <Input type="file" name="upload_destaque" onChange={handleUploadImgDestaqueAdd} />
            </ListItem>
         
          
            <br />
            <br />
            <span style={{textAlign: 'center', padding: '10px', background: '#FF6B6B'}}> Para salvar, role para cima e clique no "salvar alterações" no canto superior direito </span> 
            </form>
            </List>
            
            </>
            
        </Dialog>


        
        </>
        }
        </>
    )
}
