class View {
    constructor() {

    }

    createVideoElement({ muted = true, src, srcObject }) {
        const video = document.createElement('video');
        video.muted = muted;
        video.src = src;
        video.srcObject = srcObject;

        if (src) {
            video.controls = true;
            video.loop = true;
            Util.sleep(200).then(_ => video.play());
        }

        if (srcObject) {
            video.addEventListener('loadedmetadata', _ => video.play());
        }

        return video;
    }

    renderVideo({
        userId,
        stream = null,
        url = null,
        isCurrentId = false,
        muted = true
    }) {
        const video = this.createVideoElement({
            muted,
            src: url,
            srcObject: stream,
        });
        this.appendToHTMLTree(userId, video, isCurrentId);
    }

    appendToHTMLTree(userId, video, isCurrentId) {
        const videoDiv = document.createElement('div');
        videoDiv.id = userId;
        videoDiv.classList.add('wrapper');
        videoDiv.append(video);

        const nameDiv = document.createElement('div');
        nameDiv.innerText = isCurrentId ? '' : userId;
        nameDiv.append(videoDiv);

        const $videoGrid = document.getElementById('video-grid');
        $videoGrid.append(videoDiv);

    }

    setParticipants(count) {
        const myself = 1;
        const $participants = document.getElementById('participants');

        $participants.innerHTML = (count + myself);
    }
}