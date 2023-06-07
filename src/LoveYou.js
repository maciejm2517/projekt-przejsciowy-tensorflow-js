// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const loveYouGesture = new GestureDescription('i_love_you'); 

// Thumb 
loveYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
//loveYouGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
//loveYouGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Index
loveYouGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
//loveYouGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

// Pinky
loveYouGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
//loveYouGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);

for(let finger of [Finger.Middle, Finger.Ring]){
    loveYouGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9); 
    loveYouGesture.addCurl(finger, FingerCurl.FullCurl, 1.0); 
    //loveYouGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}



