import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {pub, host} from './Helper.js'
import '../css/test.css';
import {Badge, Button, FloatingLabel, Form, Modal, Nav} from 'react-bootstrap';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

// const { naver } = window;
function Test(){
  // const googleCid = process.env.REACT_APP_GOOGLE_CID;
  // const naverCid = process.env.REACT_APP_NAVER_CID;
  // const naverSecret = process.env.REACT_APP_NAVERS_CID;
  // const kakaoCid = process.env.REACT_APP_KAKAO_CID;
  // const location = useLocation();
  /*모달*/
  const [modalShow, setModalShow] = React.useState(false);
  /*상태별 정렬*/
  const [todos, setTodos] = useState([]);
  const [progresses, setProgresses] = useState([]);
  const [dones, setDones] = useState([]);
  /*상태별 카운트*/
  const [cntTodo,setCntTodo] = useState([]);
  const [cntProg,setCntProg] = useState([]);
  const [cntDone,setCntDone] = useState([]);

  useEffect(()=>{
      axios
      .all([
          axios.get(host+'/ajax/mytodo'),
          axios.get(host+'/ajax/myprogress'),
          axios.get(host+'/ajax/mydone'),
          axios.get(host+'/ajax/countTodo'),
          axios.get(host+'/ajax/countProgress'),
          axios.get(host+'/ajax/countDone')
      ])
      // .then(r=>{
      //     setTodos(r.data);
      // })
      .then(
          axios.spread((r1,r2,r3,r4,r5,r6)=>{
            setTodos(r1.data);
            setProgresses(r2.data);
            setDones(r3.data);
            setCntTodo(r4.data);
            setCntProg(r5.data);
            setCntDone(r6.data);
          })
      )
      .catch(e=>{
          console.log(e)
      });
  },[]);
  return(
    <>
      {/*<p>컴포넌트 경로 : src/comp/Test.js</p>*/}
      {/*<hr/>*/}
      {/*<p>모듈 추가시 꼭 --save를 붙혀주세요.</p>*/}
      {/*<p>예시: npm install react-redux --save (yarn 사용시 yarn add react-redux --save)</p>*/}
      {/*<p>페이지 추가시 App.js에서 Test 컴포넌트 있는 부분 보시고 추가하시면 됩니당 잘 안되면 문의</p>*/}
        <div className="app">
            <header>
                <br/>
                <br/>
                {/*<p id='checked'>To Do List</p>&emsp;&emsp;&emsp;&emsp;<p>알림</p>*/}
                <Nav className="justify-content-center" activeKey="">
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>To Do List</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="">
                            알림
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <br/>
            </header>
            <div className="lists">
                <div className="list">
                    <div className="list-label">To do&emsp;<Badge bg="danger"><CountTodo cntTodo={cntTodo}/></Badge></div>
                        <TodoList todos={todos}/>
                    <div className="list-add">
                        <i className="fas fa-plus toolTipBox" onClick={() => setModalShow(true)}>
                            <div className="toolTip" style={{'marginLeft': '-47.33px'}}>새 Todo 생성</div>
                        </i>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </div>
                <div className="list">
                    <div className="list-label">In Progress&emsp;<Badge bg="success"><CountProgress cntProg={cntProg}/></Badge></div>
                        <ProgressList progresses={progresses}/>
                    <div className="list-add">
                        <i className="fas fa-plus toolTipBox" onClick={() => setModalShow(true)}>
                            <div className="toolTip" style={{'marginLeft': '-47.33px'}}>새 In Progress 생성</div>
                        </i>
                    </div>
                </div>
                <div className="list">
                    <div className="list-label">Done&emsp;<Badge bg="primary"><CountDone cntDone={cntDone}/></Badge></div>
                        <DoneList dones={dones}/>
                    <div className="list-add">
                        <i className="fas fa-plus toolTipBox" onClick={() => setModalShow(true)}>
                            <div className="toolTip" style={{'marginLeft': '-47.33px'}}>새 Done 생성</div>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
function TodoList({ todos }) {
    const [modalShow, setModalShow] = React.useState(false);
    console.log(todos);
    return (
        <div>
            {todos && todos.map(todos =>{
                return(
                    <div className="list-item" draggable="true">
                        <table key={todos.todo_seq}>
                            <tr><td>{todos.todo_name}</td>
                                <Menu menuButton={<i id="dots" className="fas fa-ellipsis-h"></i>}>
                                    <MenuItem onClick={() => setModalShow(true)}>수정</MenuItem>
                                    <MyVerticallyCenteredModal2
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                    <MenuItem onClick={() => del(todos.todo_seq)}>삭제</MenuItem>
                                </Menu>
                            </tr>
                            <tr><td>{todos.todo_content}</td></tr>
                            <tr><td>{todos.todo_date}</td></tr>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
function ProgressList({ progresses }) {
    console.log(progresses);
    return (
        <div>
            {progresses && progresses.map(progresses =>{
                return(
                    <div className="list-item" draggable="true">
                        <table key={progresses.todo_seq}>
                            <tr><td>{progresses.todo_name}</td>
                                <Menu menuButton={<i id="dots" className="fas fa-ellipsis-h"></i>}>
                                    <MenuItem>수정</MenuItem>
                                    <MenuItem onClick={() => del(progresses.todo_seq)}>삭제</MenuItem>
                                </Menu>
                            </tr>
                            <tr><td>{progresses.todo_content}</td></tr>
                            <tr><td>{progresses.todo_date}</td></tr>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
function del(param){
    //alert(param);
    const i= param;
    const url = '/ajax/todoData/'
    axios.get(url, {
        params: {
            seq: i
        }
    })
    // axios.post('/todo/deleteTodo',{param})
    .then(r=>{
        console.log(r)
    })
}
function DoneList({ dones }) {
    console.log(dones);
    return (
        <div>
            {dones && dones.map(dones =>{
                return(
                    <div className="list-item" draggable="true">
                        <table key={dones.todo_seq}>
                            <tr ><td>{dones.todo_name}</td>
                                <Menu menuButton={<i id="dots" className="fas fa-ellipsis-h"></i>}>
                                    <MenuItem>수정</MenuItem>
                                    <MenuItem onClick={() => del(dones.todo_seq)}>삭제</MenuItem>
                                </Menu>
                            </tr>
                            <tr><td>{dones.todo_content}</td></tr>
                            <tr><td>{dones.todo_date}</td></tr>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
function CountTodo({ cntTodo }){
    console.log(cntTodo);
    return(
      <div>{cntTodo}</div>
    );
}
function CountProgress({ cntProg }){
    console.log(cntProg);
    return(
        <div>{cntProg}</div>
    );
}
function CountDone({ cntDone }){
    console.log(cntDone);
    return(
        <div>{cntDone}</div>
    );
}
function ShowTask({ tasks }){
    console.log(tasks);
    const list = tasks;
    const [Selected, setSelected] = useState("");
    const [todoInfo, setTodoInfo] = useState({
        projmember_seq:'',
        task_seq:'',
        todo_content:'',
        todo_name:'',
        todo_status:''
    });
    const handleSelect =(e) =>{
        setSelected(e.target.value);
    };
    return(
        <Modal.Body>
            <select onChange={handleSelect} value={Selected}>
                {list.map((item)=>(
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
            <Form.Group className="mb-2 piumInput" controlId="floatingInput">
                <FloatingLabel
                    controlId="floatingInput"
                    label="제목"
                >
                    <Form.Control type="text" placeholder="제목" value={Selected}/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className=" piumInput" controlId="floatingTextarea">
                <FloatingLabel controlId="floatingTextarea" label="설명">
                    <Form.Control type="textarea" placeholder="설명" />
                </FloatingLabel>
            </Form.Group>
        </Modal.Body>
    );
}

function MyVerticallyCenteredModal(props) {
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        axios
            .all([
                axios.get(host+'/ajax/showTask')
            ])
            .then(
                axios.spread((r1)=>{
                    setTasks(r1.data);
                })
            )
            .catch(e=>{
                console.log(e)
            });
    },[]);
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modalWrap"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    새 카드 생성
                </Modal.Title>
            </Modal.Header>
            <ShowTask tasks={tasks} />
            <Modal.Footer className="modalBtnWrap">
                {/*<Button onClick={props.onHide} className="modalBtn danger">완료처리</Button>*/}
                <Button onClick={props.onHide} className="modalBtn">생성하기</Button>

            </Modal.Footer>
        </Modal>
    );
}
function MyVerticallyCenteredModal2(props) {
    const [tasks, setTasks] = useState([]);
    const [memberSeq, setMemberSeq] = useState([]);
    // axios.post(host+'어쩌구링크', props.updateInfo)
    //     .then(r=>{
    //         console.log(r)
    //         axios.get(host+'/test')
    //             .then(r=>{
    //                 console.log(r)
    //             })
    //     })
    useEffect(()=>{
        axios
            .all([
                axios.get(host+'/ajax/showTask'),
            ])
            .then(
                axios.spread((r1,r2)=>{
                    setTasks(r1.data);
                })
            )
            .catch(e=>{
                console.log(e)
            });
    },[]);
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modalWrap"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    카드 수정
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-2 piumInput" controlId="floatingInput">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="제목"
                    >
                        <Form.Control type="text" placeholder="제목"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className=" piumInput" controlId="floatingTextarea">
                    <FloatingLabel controlId="floatingTextarea" label="설명">
                        <Form.Control type="textarea" placeholder="설명" />
                    </FloatingLabel>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modalBtnWrap">
                {/*<Button onClick={props.onHide} className="modalBtn danger">완료처리</Button>*/}
                <Button onClick={props.onHide} className="modalBtn">수정하기</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default Test;
