class View {
    constructor() {
        this.$recorderBtn = document.getElementById('record');
        this.$leaveBtn = document.getElementById('leave');
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
        isCurrentId = false
    }) {
        const video = this.createVideoElement({
            muted: isCurrentId,
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

    removeVideoElement(id) {
        const element = document.getElementById(id);
        element.remove();
    }

    toggleRecordingButtonColor(isActive = true) {
        this.$recorderBtn.style.color = isActive ? 'red' : 'white';
    }

    onRecordClick(command) {
        this.recordingEnabled = false;
        return () => {
            const isActive = this.recordingEnabled = !this.recordingEnabled;
            command(this.recordingEnabled);
            this.toggleRecordingButtonColor(this.recordingEnabled);
        }
    }

    onLeaveClick(command) {
        return async () => {
            command();
            await Util.sleep(1000);
            window.location = '/pages/home';
        };
    }

    configureRecordButton(command) {
        this.$recorderBtn.addEventListener('click', this.onRecordClick(command));
    }

    configureLeaveButton(command) {
        this.$leaveBtn.addEventListener('click', this.onLeaveClick(command));
    }
}