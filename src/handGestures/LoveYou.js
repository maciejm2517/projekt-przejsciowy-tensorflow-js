import {Finger, FingerCurl, GestureDescription} from 'fingerpose'; 

export const loveYouGesture = new GestureDescription('i_love_you'); 

loveYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
loveYouGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
loveYouGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)

for(let finger of [Finger.Middle, Finger.Ring]){
    loveYouGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9); 
    loveYouGesture.addCurl(finger, FingerCurl.FullCurl, 1.0); 
}



