import React, { useEffect, useState, useContext } from 'react'
import './Dashboard.scss'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router';
import ProfileModal from '../Modal/profileModal/profileModal';
import PostMoadl from '../Modal/postModal/postMoadl';
import { MyContext } from '../ContextApi/ContextApi';


export default function Dashboard() {
  const [files, setfiles] = useState()
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userCreatedDate, setUserCreatedDate] = useState("");
  const [userAbout, setuserAbout] = useState("");
  const [receivedUpdateData, setreceivedUpdateData] = useState({})
  const [isOpen, setisOpen] = useState(false)
  const [isPostModal, setisPostModal] = useState(false)
  const [allPosts, setallPosts] = useState([])
  const [isShowFeed, setisShowFeed] = useState(false)
  const [commentstate, setcommentstate] = useState('')
  const [isShowComment, setisShowComment] = useState(false)


  const [postlikeInteraction, setpostlikeInteraction] = useState('')
  const [postdislikeInteraction, setpostdislikeInteraction] = useState('')

  const handlepostlikeInteraction = () => {
    setpostlikeInteraction(1);
    if (postdislikeInteraction > 0) {
      setpostdislikeInteraction(0);
    }
  };

  const handlepostdislikeInteraction = () => {
    setpostdislikeInteraction(1);
    if (postlikeInteraction > 0) {
      setpostlikeInteraction(0);
    }
  };


  const navigate = useNavigate()
  console.log('recived update data', receivedUpdateData.name);

  const loc = useLocation()
  const receivedLoginData = loc.state.message.name

  const { postState, backendPostData, } = useContext(MyContext)
  console.log('dashboard state', postState);



  function getTimeAgo(timestamp) {
    const currentTime = new Date();
    const createdAt = new Date(timestamp);
    const timeDifference = currentTime - createdAt;

    if (timeDifference < 60000) {
      return "just now";
    } else if (timeDifference < 3600000) {
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < 86400000) {
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
    }
  }


  async function getResponseData() {
    try {
      const response = await axios.get('https://mernbackend-7m60.onrender.com/student/');
      console.log('58 response data', response);
      const userData = response.data;
      console.log(userData);

      const user = userData.find((user) => user.name === receivedLoginData);
      console.log('user', user);
      if (user) {
        setUserName(user.name);
        setUserImage(user.image);
        setUserCreatedDate(user.createdAt)
        setuserAbout(user.about)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  console.log('img dash', userImage);

  useEffect(() => {
    getResponseData();
  }, []);



  var loadFile = function (event) {
    var image = document.getElementById('output');
    var image1 = document.getElementById('output1');
    var image2 = document.getElementById('output2');
    var image3 = document.getElementById('output3');
    var image4 = document.getElementById('output4');

    if (event.target.files && event.target.files[0]) {

      image.src = URL.createObjectURL(event.target.files[0]);

      setfiles(event.target.files[0])
      image1.src = URL.createObjectURL(event.target.files[0]);
      image2.src = URL.createObjectURL(event.target.files[0]);
      if (image3 || image4) {
        image3.src = URL.createObjectURL(event.target.files[0]);
        image4.src = URL.createObjectURL(event.target.files[0]);


      }
    }




  };



  useEffect(() => {
    const formData = new FormData();
    console.log(files);
    formData.append('image', files);
    formData.append('receivedLoginData', receivedLoginData);
    console.log('formdta value', formData.get('receivedLoginData'));

    let ss = axios.post('https://mernbackend-7m60.onrender.com/student/upload', formData)

    console.log('formdata ss', ss);
    ss.then((res) => console.log(res))
      .catch((er) => console.log(er))


    // console.log(formData);
    handleMyFeed()

  }, [files], [allPosts])


  console.log('recivedlogindata:', receivedLoginData);
  function handlelogout() {
    alert('logout succesfully')
    navigate('/')
  }

  async function handleMyFeed() {
    console.log('feed clicking');
    await axios.post('https://mernbackend-7m60.onrender.com/student/feed')
      .then((res) => console.log('feed res', setallPosts(res.data))).catch((err) => console.log('feed error', err))


  }
  function handleComment(e) {
    console.log(e.target.value);
    setcommentstate(e.target.value)

  }

  console.log('allPosts', allPosts);
  console.log('all img', allPosts?.image);
  const myfeedPost = allPosts.find((user) => user.username === receivedLoginData)
  console.log('my feed post', myfeedPost);

  return (
    <>

      <header className='header-class'>
        <div className='logo1'><img src="https://soombo.loominate.app/static/media/newlogo.51801a18.png" class="logo" alt="Loominate" />
        </div>
        <div className='searchbar'>
          <input type='search' placeholder='  type Something here' />
          <i class="fa fa-search"></i>
        </div>

        <div className='icon' >
          <img src="https://soombo.loominate.app/static/media/Message.52172867.svg" alt="msg" />
          <img src="https://soombo.loominate.app/static/media/Notification.3f85f7ce.svg" alt="notification" />


          <span className='logoutButton' onClick={handlelogout}>  <span style={{ fontSize: "18px" }}> logOut </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>

          </span>


        </div>

      </header>

      <div className='mainPannel'>
        <div className='leftPannel'>


          <div class="leftMenu"><ul><li><a><div class="leftMenuItem"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="currentColor" style={{ marginleft: "13px;" }}>
            <path d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z">

            </path></svg><span onClick={() => setisShowFeed(true)}>MY FEED</span></div></a></li><li><a><div class="leftMenuItem"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
              style={{ marginleft: "13px;" }}><path d="M5,12a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V13A1,1,0,0,0,5,12ZM10,2A1,1,0,0,0,9,3V21a1,1,0,0,0,2,0V3A1,1,0,0,0,10,2ZM20,16a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V17A1,1,0,0,0,20,16ZM15,8a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V9A1,1,0,0,0,15,8Z">
              </path></svg><span>LEADERBOARD</span></div></a></li><li><a><div class="leftMenuItem"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                style={{ marginleft: "13px;" }}><path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"></path>
              </svg><span onClick={(() => setisOpen(true))}>MY PROFILE</span></div></a></li></ul></div>

          <div class="leftCategory"><h5>CATEGORIES</h5><div class="leftListItems"><button>Advice Needed</button><button>Asking For A Colleague</button><button>Ask Me Anything</button>
            <button>Bluecollar Community</button><button>Burning Issues</button>
            <button>Career Advice</button><button>Changemaking</button><button>Communities</button><button>Company News</button>
            <button>Confessions</button><button>Crazy Ideas</button>
            <button>Culture</button><button>Customer Experience</button></div></div>


        </div>


        {/* // Centre Pannel */}
        <div className='centrePannel'>

          <div class="feedContainer"><div class="inputFeedContainer">
            <div class="inputFeed" onClick={(() => setisPostModal(true))}>
              <div class="inputInnerFeed">
                <span>Post Something...</span><div class="plusIcon">
                  <span role="img" aria-label="plus-circle" class="anticon anticon-plus-circle"
                    style={{ fontsize: "30px", color: "rgb(3, 197, 204)" }}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z">

                      </path>
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
                      </path></svg></span></div></div></div>

            <div class="feedBtnContainer"><div class="feedLeftBtn"><ul><a><li><div class="btnList">All</div></li></a><a><li>
              <div class="btnList">Polls</div></li></a><a><li>
                <div class="btnList">Initiatives</div></li></a></ul></div><div class="feedRecentBtn"><a class="ant-dropdown-trigger"
                  style={{ textdecoration: "none;" }}><div class="ant-space css-dev-only-do-not-override-yp8pcc ant-space-horizontal ant-space-align-center"
                    style={{ gap: "8px;" }}>
                    <div class="ant-space-item" >Recent</div><div class="ant-space-item"><span role="img" aria-label="down"
                      class="anticon anticon-down"><svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                        </path></svg></span></div></div></a></div></div></div>


            {/* post part */}

            {isShowFeed ? (myfeedPost && myfeedPost.posts.map((c) => {
              return (
                <div className='commentCard' >
                  <div className='commentHeading'>Advice needed</div>

                  <div className='commentProfile'>
                    <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} /></p>
                    <p style={{ display: "flex" }}>


                      {userImage &&
                        <img src={require(`../../ima/${myfeedPost?.image}`)} alt="User" id='output1' />

                      }

                      <p><label htmlFor="file" style={{ cursor: "pointer" }}><i style={{ fontSize: "22px", marginLeft: "1px", marginTop: "21px" }} className="fa">&#xf067;</i></label></p>
                    </p>
                    <div className='commentUser'>
                      <div>{myfeedPost.username}</div>
                    </div>
                    <div className='commentYou'>you</div>
                  </div>

                  <div className='commentBody'>
                    <div style={{ height: "auto" }}>
                      {c.content}
                    </div>
                    <hr />
                    <div className='tag' style={{ color: "red" }}>#first post</div>
                  </div>

                  <div className='commentIcon'>
                    <span onClick={handlepostlikeInteraction}>
                      <i className="fa fa-thumbs-up" style={{ fontSize: "24px" }}>
                      </i><span>{postlikeInteraction}</span></span>

                    <span onClick={handlepostdislikeInteraction}><i className="fa fa-thumbs-down" style={{
                      fontSize: "24px", marginLeft: '7px',
                      marginRight: "7px"
                    }}></i><span>{postdislikeInteraction}</span></span>

                    <span ><i className="fa fa-comment" style={{ fontSize: "24px", backgroundColor: "white" }}>
                    </i><span>0</span></span>
                  </div>
                  <div className='postComment'>

                    <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} /></p>
                    <p style={{ display: "flex" }}>
                      <img id='output2' />
                      <p><label htmlFor="file" style={{ cursor: "pointer" }}><i style={{ fontSize: "22px", marginLeft: "1px", marginTop: "21px" }} className="fa">&#xf067;</i></label></p>
                    </p>
                    <div className='typeComment'>
                      <input className='commentType' onChange={handleComment}
                        style={{ position: "relative", top: "23px", left: "52px", }}
                        placeholder='Comment your thought...' />
                      <div className='postButton'>

                        <span style={{ fontSize: "21px", marginLeft: '21px' }}>post</span>

                        <i className='fa fa-arrow-circle-right' style={{ marginLeft: "5px" }}></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className='commentbutton'
                    onClick={(() => isShowComment ? setisShowComment(false) : setisShowComment(true))}>view comments</div>

                  {isShowComment && commentstate != '' ? <div className='commentProfile' style={{ border: "1px solid red", borderRadius: "50px", padding: "10px" }}>
                    <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} /></p>
                    <p style={{ display: "flex" }}>


                      {userImage &&
                        <img src={require(`../../ima/${myfeedPost?.image}`)} alt="User" id='output1' />

                      }

                    </p>

                    <div className='commentUser'>
                      <div style={{ marginLeft: "10px" }}>{myfeedPost.username}</div>
                    </div>
                    <div className='commentYou'>you</div>
                    <div style={{
                      position: "relative",
                      top: "72px",
                      right: "82px",
                      overflowWrap: "break-word",
                      width: "700px",
                      textAlign: "start"
                    }}>
                      {commentstate}
                    </div>

                  </div>
                    : ""}



                </div>
              );

            })) :


              /// All post

              ((allPosts && allPosts.map((user) => {
                return user.posts.map((c) => {
                  return (
                    <div className='commentCard' >
                      <div className='commentHeading'>Advice needed</div>
                      <div className='commentProfile'>
                        <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} /></p>
                        <p style={{ display: "flex" }}>

                          {user.image &&
                            <img src={require(`../../ima/${user?.image}`)} alt="User" id='output1' />

                          }

                          <p><label htmlFor="file" style={{ cursor: "pointer" }}><i style={{ fontSize: "22px", marginLeft: "1px", marginTop: "21px" }} className="fa">&#xf067;</i></label></p>
                        </p>
                        <div className='commentUser'>
                          <div>{user.username}</div>
                        </div>
                        <div className='commentYou'>you</div>
                      </div>
                      <div className='commentBody'>
                        <div style={{ height: "auto" }}>
                          {c.content}
                        </div>
                        <hr />
                        <div className='tag' style={{ color: "red" }}>#first post</div>
                      </div>
                      <div className='commentIcon'>
                        <span><i className="fa fa-thumbs-up" style={{ fontSize: "24px" }}></i><span>2</span></span>
                        <span><i className="fa fa-thumbs-down" style={{ fontSize: "24px", marginLeft: '7px', marginRight: "7px" }}></i><span>1</span></span>
                        <span><i className="fa fa-comment" style={{ fontSize: "24px", backgroundColor: "white" }}></i><span>3</span></span>
                      </div>
                      <div className='postComment'>
                        <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: 'none' }} /></p>
                        <p style={{ display: "flex" }}>
                          <img id='output2' />
                          <p><label htmlFor="file" style={{ cursor: "pointer" }}><i style={{ fontSize: "22px", marginLeft: "1px", marginTop: "21px" }} className="fa">&#xf067;</i></label></p>
                        </p>
                        <div className='typeComment'>
                          <span style={{ position: "relative", top: "23px", left: "52px" }}>Comment your thought....</span>
                          <div className='postButton'>
                            <span style={{ fontSize: "21px", marginLeft: '21px' }}>post</span>
                            <i className='fa fa-arrow-circle-right' style={{ marginLeft: "5px" }}></i>
                          </div>
                        </div>
                      </div>
                      <div>view comments</div>

                    </div>
                  );
                });
              })))}







          </div>
        </div>


        {/* Right pannel */}
        <div className='rightPannel'>

          <div class="leftMenu">
            <div className='profile'> My Profile </div>

            <p><input type="file" accept="image/*" name="image" enctype="multipart/form-data" id="file"
              onChange={loadFile} style={{ display: 'none' }} /></p>

            <p style={{ display: "flex" }}>

              {userImage &&
                <img src={require(`../../ima/${userImage}`)} alt="User" id='output' />

              }

              {/* <img id='output' /> */}

              <p><label for="file" style={{ cursor: "pointer;" }}>

                <i style={{
                  fontsize: "22px",
                  marginleft: "1px",
                  margintop: "21px"
                }}
                  class="fa">
                  &#xf067;
                </i>
              </label>

              </p>

              <>
                <div className='userName'>
                  {receivedUpdateData && receivedUpdateData.name ? (
                    <div>{receivedUpdateData.name}</div>
                  ) : (
                    <div>{userName}</div>
                  )}
                  <span style={{ fontSize: "12px", fontWeight: "lighter" }}> {getTimeAgo(userCreatedDate)}</span>  </div>

              </> </p>

          </div>


          <div class="aboutLeftMenu">
            <div className='About'> About</div>

            <p style={{ textAlign: "left", padding: "10px", color: "white" }}>
              {receivedUpdateData && receivedUpdateData.name ? (
                <div>{receivedUpdateData.about}</div>
              ) : (
                <div>{userAbout}</div>
              )}
            </p>

            {isOpen ? <ProfileModal isOpen={setisOpen} loadFile={loadFile}
              receivedUpdateData={receivedUpdateData}
              setreceivedUpdateData={setreceivedUpdateData} /> : ''}
          </div>

          {isPostModal ? <PostMoadl isPostModal={setisPostModal} loadFile={loadFile} receivedUpdateData={receivedUpdateData}
            setreceivedUpdateData={setreceivedUpdateData}
            userName={userName} getTimeAgo={getTimeAgo} userCreatedDate={userCreatedDate} /> : ''}
        </div>

      </div >

    </>
  )
}
