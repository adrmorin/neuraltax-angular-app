import { Component, inject, ViewChild, ElementRef, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../../components/common/about-us.component';
import { ModalService } from '../../services/modal.service';
import { HeaderComponent } from '../../components/common/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [RouterLink, CommonModule, AboutUsComponent, HeaderComponent, TranslateModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
    public modalService = inject(ModalService);

    @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;

    isPlaying = signal(false); // Default to false to ensure content is visible if video fails
    isMuted = signal(true);

    onPlay() {
        this.isPlaying.set(true);
    }

    onPause() {
        this.isPlaying.set(false);
    }

    togglePlay() {
        const video = this.videoRef.nativeElement;
        if (video.paused) {
            video.play().catch(e => console.error('Error playing video:', e));
        } else {
            video.pause();
        }
    }

    toggleMute() {
        const video = this.videoRef.nativeElement;
        video.muted = !video.muted;
        this.isMuted.set(video.muted);
    }

    onVideoEnded() {
        const video = this.videoRef.nativeElement;
        video.currentTime = 0; // Reset to frame 1
        this.isPlaying.set(false);
    }
}
