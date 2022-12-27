import { React, useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Navbar from './components/navbar.js'
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80%",
  overflowY: "scroll",
};

const AdminPage = () => {
  const [userTableData, setUserTableData] = useState([]);
  const [open, setOpen] = useState(false);
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(""))
  );
  const [description, setDescription] = useState(editorState);
  const [mail, setMail] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  let tableRows = [];

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token === 'undefined')
      navigate("../login");
    else
    {
      console.log(token)
    axios
      .get("https://ebook.herokuapp.com/api/User/rows", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(async (x) => {
        setUserTableData(x.data);
        ////// console.log(userTableData); //tu nece da ih prikaze, prikazuje prazan niz
      })
      .catch((error) => {
        console.log(error);
      });
    }
     
  }, []);

  const getHtmlForConcreteRow = async (email) => {
    await axios
      .get("https://ebook.herokuapp.com/api/User/html/" + email, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then(async (x) => {
        console.log(x.data);
        
        //console.log(description);
        //const formated = htmlToDraft(x.data);
        //setDescription(EditorState.create(formated));
        //console.log(description);

        setDescription(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(x.data).contentBlocks)
          )
        );
        //return x.data;
      })
      .catch((error) => {
                //ako je 404 onda setujes u editor tekst da admin rucno unese neke obroke jer nije pronadjen nijedan obrok
          if (error.response.status === 404)
          {
            setDescription(
              EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft("").contentBlocks)
              )
            );
          }
        console.log(error);
      });
  };

  const sendDocumentToEmail = async (mail) => {
    var emailDto = {
      email: mail,
      htmlPage: draftToHtml(convertToRaw(description.getCurrentContent())),
    };
    console.log(emailDto);

    await axios
      .post("https://localhost:7231/api/User/sendMail", emailDto, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then(async (x) => {
        handleClose();
        console.log(emailDto);
        deleteUserData(mail);
        setMail("");
        setDescription(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft("").contentBlocks)
          )
        );
        console.log(description);
        window.location.reload(true);//
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUserData = async (mail) => {
    await axios
      .delete("https://ebook.herokuapp.com/api/User/userData/" + mail, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
      .then(async (x) => {
        console.log("Deleted users data");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const mapGoal = (goal)=>{
    if(goal == "Fattening")
      return "Gojenje";
    if(goal=="WeightLoss")
      return "Mrsavljenje"
    
    return "Odrzavanje"
  }

  const uploadImageCallBack =(file)=>{
    return new Promise(
      (resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgbb.com/1/upload?expiration=9000&key=8108d069dea408975bf2a6ef269040b7'); //  //https://api.imgur.com/3/image
       // xhr.setRequestHeader('Authorization', 'Client-ID f5f74e27950b037')  //0f5a7c212beb5bfb4ee14d39505a20eebb7c391c
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', ()=>{
          const error = JSON.parse(xhr.responseText);
          reject(error);
        })
      }
    )
  }

  userTableData.forEach((record) => {
    //na onclose za modal dodati funkciju koja izbacuje alert da ako su vrsene neke promene nad tekstom prikaze upozorenje da ce one biti obrisane
    //dodati dugme close koje ce svakako da pozove tu funkciju kao i kad se klikne bilo gde sa strane
    //dodati dugme send to email koja ce da posalje na mejl ono sto je napisano
    tableRows.push(
      //kad se klikne na dugme izvrsice se fja handleOpen koja postavlja open na true
      <tr>
        <td>{record.dateCreated}</td>
        <td>{mapGoal(record.goal)}</td>
        <td>{record.additions}</td>
        <td>{record.number}</td>
        <td>{record.mail}</td>
        <td>
          <Button
            onClick={() => {
              getHtmlForConcreteRow(record.mail);
              handleOpen();
              setMail(record.mail);
            }}
          >
            Pogledaj e-book
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Generisani plan ishrane
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* ovde stavi text edit komponentu */}
                <Editor
                  toolbar={
                  //   {
                  //   options: ["inline", "textAlign", "list", "link", "colorPicker"],
                  //   inline: {
                  //     options: ["bold", "italic", "underline"],
                  //   },
                  //   link: {
                  //     options: ["link"],
                  //   },
                  //   list: {
                  //     options: ["unordered", "ordered", "indent", "outdent"],
                  //   },
                  
                  {
                    options: ['inline', 'list', 'textAlign', 'history', 'image'],
                    inline: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    },
                    list: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['unordered', 'ordered', 'indent', 'outdent'],
                    },
                    textAlign: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['left', 'center', 'right', 'justify'],
                    },
                    history: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['undo', 'redo'],
                    },
                    image: {
                      // icon: image,
                      //className: undefined,
                      //component: undefined,
                      //popupClassName: undefined,
                      urlEnabled: true,
                      uploadEnabled: true,
                     // alignmentEnabled: true,
                      uploadCallback: uploadImageCallBack,
                      //previewImage: false,
                      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                      alt: { present: false, mandatory: false },
                      defaultSize: {
                        height: '400px',
                        width: '400px',
                      },
                    },
                  }
                }
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  editorState={description}
                  onEditorStateChange={onEditorStateChange}
                  //initialContentState={}
                />
              </Typography>
              <Typography id="modal-modal-footer">
                <Button variant="contained" size="large" className="buttonCloseAdmin" onClick={handleClose}>
                  {/* ako stavim () => onda klik na close nece da zatvori modal. Na ovaj nacin se funkcija poziva tek kad se klikne na dugme */}
                  Close
                </Button>
                <Button
                  className = "buttonSendAdmin"
                  variant="contained"
                  size="large"
                  onClick={() => sendDocumentToEmail(mail)}
                >
                  {/* // ako obrisem () => onda ce odma da se izvrsava sendDocumentToEmail kad se ucita stranica. Na ovaj nacin se funkcija poziva tek kad se klikne na dugme */}
                  Send
                </Button>
              </Typography>
            </Box>
          </Modal>
        </td>
      </tr>
    );
  });

  return (
    <div className="adminPage">
      <Navbar />
      <h1 className="headerAdminPage">
        {" "}
        Broj korisnika koji cekaju na svoj e-book: {userTableData.length}
      </h1>

      <table className="tableAdminPage">
        <thead>
          <tr>
            <th>Datum prijave</th>
            <th>Cilj</th>
            <th>Sastojci koje ne jede</th>
            <th>Telefon</th>
            <th>Mail</th>
            {/* <th>Telefon</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default AdminPage;
