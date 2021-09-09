//client sdk import
import HuddleClient, { emitter } from "huddle01-client";

//react imports
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

//helper imports
import { getTrack } from "../lib/utils/helpers";
import { PeerVideo, PeerAudio, PeerScreen } from "../components/PeerViewPort";
import Onboard from 'bnc-onboard'
import Web3 from 'web3';
import axios from 'axios';

function Room() {
    const history = useHistory();
    //to allow for recordings
    const isBot = localStorage.getItem("bot_password") === "huddle01";
    //initialising states
    const [huddle, setHuddle] = useState(null);
    const [roomState, setRoomState] = useState(false);
    const [micState, setMicState] = useState(false);
    const [webcamState, setWebcamState] = useState(false);
    const [screenshareState, setScreenshareState] = useState(false);
    const [isHost, setIsHost] = useState(true);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [beginTime, setBeginTime] = useState(new Date());
    const [recAddress, setrecAddress] = useState('');


    let hostid = "";
    const [peers, setPeers] = useState([]);
    const [consumerStreams, setConsumerStreams] = useState({
        video: [],
        audio: [],
        screen: [],
    });

    const meVideoElem = useRef(null);
    const meScreenElem = useRef(null);
    const joinRoomBtn = useRef(null);

    const config = {
        apiKey: "i4pzqbpxza8vpijQMwZsP1H7nZZEH0TN3vR4NdNS",
        roomId: "C131",
        peerId: "Rick" + Math.floor(Math.random() * 4000),
        displayName: "Rick Sanchez",
        window,
        isBot, // true/false -- gets calculated on line 15
    };

    //initialize the app
    useEffect(() => {
        history.push(`?roomId=${config.roomId}`);

        const myHuddleClient = new HuddleClient(config);
        setHuddle(myHuddleClient);

    }, []);
    useEffect(() => {
        console.log("peers array ", peers);
        if (huddle) {
            console.log(huddle);
            if (huddle._hostId) {
                if (huddle._hostId != huddle._peerId) {
                    setIsHost(false);
                }
            }
        }

    }, [peers, huddle]);
    useEffect(() => {
        console.log("recaddress",recAddress);
    },[recAddress]);

    //recording config
    useEffect(() => {
        //joinRoomBtn here can be whatever button/function used that calls `huddle.join()`
        huddle && isBot && joinRoomBtn.current.click();
    }, [huddle, isBot]);

    const setupEventListeners = async () => {
        emitter.on("roomState", (state) => {
            switch (state) {
                case "connected":
                    //do whatever
                    break;
                case "failed":
                    //do whatever
                    break;
                case "disconnected":
                    //do whatever
                    break;
                default:
                    break;
            }
            setRoomState(state);
        });

        emitter.on("error", (error) => {
            alert(error);
            //do whatever
        });

        emitter.on("addPeer", (peer) => {
            console.log("new peer =>", peer);
            setPeers((_peers) => [..._peers, peer]);
        });

        emitter.on("addProducer", (producer) => {
            console.log("new prod", producer);
            switch (producer.type) {
                case "webcam":
                    let videoStream = producer.track;
                    if (typeof videoStream == "object") {
                        try {
                            meVideoElem.current.srcObject = getTrack(videoStream);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    break;
                case "mic":
                    //do whatever
                    break;
                case "screen":
                    videoStream = producer.track;
                    if (typeof videoStream == "object") {
                        try {
                            meScreenElem.current.srcObject = getTrack(videoStream);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    break;

                default:
                    break;
            }
        });

        emitter.on("removeProducer", (producer) => {
            console.log("remove ", producer);
            switch (producer.type) {
                case "webcam":
                    try {
                        meVideoElem.current.srcObject = null;
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                case "mic":
                    //do whatever
                    break;
                case "screen":
                    try {
                        meScreenElem.current.srcObject = null;
                    } catch (error) {
                        console.error(error);
                    }
                    break;

                default:
                    break;
            }
        });

        emitter.on("addConsumer", (consumer) => {
            switch (consumer.type) {
                case "webcam": {
                    const videoStream = consumer.track;
                    setConsumerStreams((prevState) => ({
                        ...prevState,
                        video: [...prevState.video, videoStream],
                    }));

                    break;
                }

                case "screen": {
                    const screenStream = consumer.track;
                    setConsumerStreams((prevState) => ({
                        ...prevState,
                        screen: [...prevState.screen, screenStream],
                    }));
                    break;
                }

                case "mic": {
                    const audioStream = consumer.track;
                    setConsumerStreams((prevState) => ({
                        ...prevState,
                        audio: [...prevState.audio, audioStream],
                    }));

                    break;
                }

                default:
                    break;
            }
        });

        emitter.on("removeConsumer", (consumer) => {
            switch (consumer.type) {
                case "screen":
                    setConsumerStreams((prevState) => {
                        return {
                            ...prevState,
                            screen: prevState.screen.filter(
                                (_consumer) => _consumer.id !== consumer._id
                            ),
                        };
                    });
                    break;
                case "webcam":
                    setConsumerStreams((prevState) => {
                        return {
                            ...prevState,
                            video: prevState.video.filter(
                                (_consumer) => _consumer.id !== consumer._id
                            ),
                        };
                    });
                    break;
                case "mic":
                    setConsumerStreams((prevState) => {
                        return {
                            ...prevState,
                            audio: prevState.audio.filter(
                                (_consumer) => _consumer.id !== consumer._id
                            ),
                        };
                    });
                    break;

                default:
                    break;
            }
        });
    };

    const joinRoom = async () => {

        if (!huddle)
            return;
        try {
            setupEventListeners();
            await huddle.join();
            console.log("post join", huddle);
            setBeginTime(new Date());
        } catch (error) {
            alert(error);
        }
    };

    const leaveRoom = async () => {

        if (!huddle) return;
        try {
            await huddle.close();
            setRoomState(false);
            var secondBetweenTwoDate = Math.abs((new Date().getTime() - beginTime.getTime()) / 1000)
            if (recAddress){
                axios.post(`http://localhost:3001/transactions`, { timediff: secondBetweenTwoDate, receiverAddress: recAddress })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
            }
            console.log(secondBetweenTwoDate);
        } catch (error) {
            alert(error);
        }
    };

    //TODO: add pauseWebcam() and resumeWebcam()
    const enableWebcam = async () => {
        if (!huddle) return;
        try {
            await huddle.enableWebcam();
            setWebcamState(true);
        } catch (error) {
            setWebcamState(false);
            alert(error);
        }
    };

    const disableWebcam = async () => {
        if (!huddle) return;
        try {
            await huddle.disableWebcam();
            setWebcamState(false);
        } catch (error) {
            alert(error);
        }
    };

    const startScreenshare = async () => {
        if (!huddle) return;
        try {
            await huddle.enableShare();
            setScreenshareState(true);
        } catch (error) {
            alert(error);
            setScreenshareState(false);
        }
    };

    const stopScreenshare = async () => {
        if (!huddle) return;
        try {
            await huddle.disableShare();
            setScreenshareState(false);
        } catch (error) {
            alert(error);
        }
    };

    //TODO: add muteMic() and unmuteMic()
    const enableMic = async () => {
        if (!huddle) return;
        try {
            huddle.enableMic();
            setMicState(true);
        } catch (error) {
            setMicState(false);
            alert(error);
        }
    };

    const disableMic = async () => {
        if (!huddle) return;
        try {
            huddle.disableMic();
            setMicState(false);
        } catch (error) {
            alert(error);
            setMicState(true);
        }
    };

    const startRecording = async () => {
        if (!huddle) return;
        try {
            const status = await huddle.startRecording();
            if (status) console.log("recording successfully initiated");
        } catch (error) {
            console.error(error);
        }
    };

    const stopRecorder = async () => {
        if (!huddle) return;
        try {
            const status = await huddle.stopRecording();
            if (status) console.log("recording successfully stopped");
        } catch (error) {
            console.error(error);
        }
    };
    const networkIds = {
        'mainnet': 1,
        'matic': 137,
        'ropsten': 3,
        'rinkeby': 4,
        'goerli': 5,
        'kovan': 42,
        'matictestnet': 80001,
        'ganache': 5777
    }

    let web3;



    
    async function login() {
        const onboard = Onboard({
            dappId: '68159813-dea2-4d6c-8e1d-3657f5bb3a15',
            //chainId:networkIds.ganache,
            networkId: networkIds.ganache,
            subscriptions: {
                wallet: wallet => {
                    web3 = new Web3(wallet.provider);
                    console.log(wallet.name, " is now connected!");
    
                },
                address: address => {     
                    let temprecaddress = address;            
                    console.log(address);
                   setrecAddress(temprecaddress); 
                   setIsLoggedIn(true);
                }
    
            },
        });
       
        await onboard.walletSelect();
    }



    return (
        <div className="App">
            <div>
                <button onClick={login} disabled={isLoggedIn}>Login to Earn</button>
            </div>
            <div className="me-ports">
                <video height="400px" width="400px" autoPlay ref={meVideoElem} />
                <video height="400px" width="400px" autoPlay ref={meScreenElem} />
            </div>
            <div className="btn-grp">
                <button
                    ref={joinRoomBtn}
                    id="join-btn"
                    onClick={roomState === "connected" ? leaveRoom : joinRoom}
                >
                    {roomState === "connected" ? "Leave Room" : "Join Room"}
                </button>
                { }
                <button onClick={webcamState ? disableWebcam : enableWebcam} disabled={!isHost}>
                    {webcamState ? "Disable Webcam" : "Enable Webcam"}
                </button>
                <button onClick={micState ? disableMic : enableMic} disabled={!isHost}>
                    {micState ? "Disable Mic" : "Enable Mic"}
                </button>
                <button onClick={screenshareState ? stopScreenshare : startScreenshare} disabled={!isHost}>
                    {screenshareState ? "Disable Screenshare" : "Enable Screenshare"}
                </button>
                {/* <button onClick={toggleWebcam}>Toggle Webcam</button> */}
            </div>

            <div className="peer-ports">
                {consumerStreams.video.map((stream, idx) => {
                    return <PeerVideo key={idx} videoTrack={getTrack(stream)} />;
                })}
                {consumerStreams.screen.map((stream, idx) => {
                    return <PeerScreen key={idx} screenTrack={getTrack(stream)} />;
                })}
                {consumerStreams.audio.map((stream, idx) => {
                    return <PeerAudio key={idx} audioTrack={getTrack(stream)} />;
                })}
            </div>
        </div>
    );
}

export default Room;
