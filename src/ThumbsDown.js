import * as fp from "fingerpose";


// describe thumbs up gesture 👍
export const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);

thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);

thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);

// do this for all other fingers
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}