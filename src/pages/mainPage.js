import React,{useEffect,useState} from 'react'
import { 
    Container, 
    Grid, 
    Typography, 
    Card, 
    Button,
    ToggleButton, 
    ToggleButtonGroup,
    Menu,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
    useMediaQuery,} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import AddTodo from '../components/addTodo';
import EditTodo from '../components/editTodo';
import GenericModal from '../components/modalTodo';
import { fetchData } from '../utils/apiCall';
import { dataUrl } from '../utils/urls';


const MainPage = () =>{

    const [loading,setLoading]=useState(true)
    const [data,setData]=useState([])
    const [alertMsg,setAlertMsg]=useState('')

    const [modalOpen, setModalOpen] = useState(false);
    const [formContent, setFormContent] = useState(null);
    const [formTitle,setFormTitle]=useState(null)

    const [filterValue,setFilterValue]=useState('all')
    const [selectedItem,setSelectedItem]=useState({})

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [anchorEl, setAnchorEl] = useState(null);

// function to close popup notification
    const onCloseAlertMsg = () => {
        setAlertMsg("");
      };

    // to handle menu open/close of todo actions
    const open = Boolean(anchorEl);
    const handleClick = (e,item) => {
        setSelectedItem(item)
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setSelectedItem({})
        setAnchorEl(null);
        
    };

// function to handle delete todo
    const handleDelete = (item)=>{
        setData(prevStatus =>
            prevStatus.filter(i=> 
                i.id !== item.id    
            ))
        setAlertMsg("deleted successfully")
        handleClose()
    }

// function to handle status change of todo
    const handleStatusChange =(item)=>{
        setData( prevStatus => 
            prevStatus.map( i=>
                i.id===item.id?{...item,completed:!item.completed}:{...i}    
            ) )
            setAlertMsg("completion status changed ")

    }

//  function to handle toggle for tab change
    const handleTabChange = (e, newValue) => {
        setFilterValue(newValue);
      };

// function to handle form submission through generic modal
    const handleFormSubmit = (action,formData)=>{
        if (action==='add'){
            setData((prevData=> [...prevData,formData]))
            closeModal()
            setAlertMsg("added successfully")

        }
        else if (action==='edit'){
            setData( prevStatus => 
                prevStatus.map( i=>
                    i.id===formData.id?{...formData}:{...i}    
                ) )
            closeModal()
            handleClose()
            setAlertMsg("changed successfully")

        }
    }

// fucntion to pass title and content to generic modal accordingly
    const openModal = (action,item) => {
        if(action==='add'){
          setFormTitle('Add New Todo')
          setFormContent(<AddTodo onSubmit={handleFormSubmit} />);
         
        }else if(action==='edit'){
          setFormTitle(`Edit Todo (id: ${parseInt(item.id)})`)
           setFormContent(<EditTodo onSubmit={handleFormSubmit} item={item} />);
         
        }
        setModalOpen(true);
      };

    const closeModal = () => {
        setModalOpen(false);
        setFormContent(null);
        setFormTitle(null)
      };

// function to fecth data through generic fetch api function
    const getData=async()=>{
        try{
            const res = await fetchData(dataUrl)  
            setData(res)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }  
    }
    
    useEffect(()=>{
        setLoading(true)
        getData()    
    },[])

    return(

        <Container sx={{mt:3}}>
        
        <div style={{display:'flex', justifyContent: isSmallScreen?'':'space-between', flexDirection:isSmallScreen?'column':'row', alignItems:'center'}}>
            
            <Button variant="contained" color="primary" sx={{px:5,mb:isSmallScreen?3:''}} onClick={(e)=>openModal("add")} fullWidth={isSmallScreen?true:false}>
                Add Todos
            </Button>

            <ToggleButtonGroup
                color="primary"
                value={filterValue}
                exclusive
                onChange={handleTabChange}
                aria-label="Platform"
                >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value={true}>Completed</ToggleButton>
                <ToggleButton value={false}>Pending</ToggleButton>
                </ToggleButtonGroup>

                <Snackbar
                    open={(alertMsg.length>1)}
                    autoHideDuration={4000}
                    onClose={onCloseAlertMsg}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" onClose={onCloseAlertMsg}>
                        {alertMsg}
                    </Alert>
                </Snackbar>
            </div>
        
        {loading ? (
            <div
            style={{
                display: "flex",
                height: "90vh",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <CircularProgress />
            </div>
        ) : (
        <>
            {data.length>0? 
            <>
                {data
                .filter(item => item.completed === filterValue || filterValue==='all')
                .map(item => (
                    <Card key={item.id} sx={{ mt: 2, p: 3, backgroundColor:item.completed? "#e5ffe5":"" }}>
                        <Grid container sx={{alignItems:'center'}}>
                            <Grid item xs={1} onClick={(e)=>handleStatusChange(item)}>
                            <Typography variant='p'>{parseInt(item.id)}</Typography>
                            </Grid>
                            <Grid item xs={10} onClick={(e)=>handleStatusChange(item)}>
                            <Typography variant='p'>{item.title}</Typography><br/>
                            <Typography variant='p' sx={{fontSize:'small',fontWeight:'light',color:'grey'}}>{item.completed ? "@completed":"@pending"}</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{justifyContent:'center'}}>
                                <Button id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(e)=>handleClick(e,item)}
                                        >
                                            <MoreHorizIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                {data
                    .filter(item => item.completed === filterValue || filterValue==='all')
                    .length>0 ? 
                    <></>
                    :
                    <div style={{ height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>No Data To Show</Typography>
                    </div>
                }
            </>
            :
            <div style={{ height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>No Todos Item</Typography>
            </div>
            }
        </>
        )}

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem onClick={(e)=>openModal("edit",selectedItem)}><ModeEditOutlineOutlinedIcon fontSize='small'/> Edit</MenuItem>
            <MenuItem onClick={(e)=>handleDelete(selectedItem)}><DeleteOutlineIcon fontSize='small'/> Delete</MenuItem>
        </Menu>

        <GenericModal 
            open={modalOpen}
            onClose={closeModal}
            title={formTitle}
            content={formContent}
        />

        </Container>
    );
};
export default MainPage;