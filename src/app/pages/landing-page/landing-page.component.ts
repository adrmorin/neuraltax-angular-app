import { Component, inject, ViewChild, ElementRef, signal, AfterViewInit } from '@angular/core';
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
export class LandingPageComponent implements AfterViewInit {
    public modalService = inject(ModalService);

    @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;

    isPlaying = signal(false); // Default to false to ensure content is visible if video fails
    isMuted = signal(true); // Default to true for better autoplay success

    ngAfterViewInit() {
        if (this.videoRef && this.videoRef.nativeElement) {
            const video = this.videoRef.nativeElement;

            // Protection Rules:
            // 1. Set source via JS to bypass basic HTML sniffers
            video.src = 'assets/landing/Neuraltax_final.mp4';
            video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');
            video.setAttribute('disablePictureInPicture', 'true');
            video.load();

            // 2. Disable pointer events for hover protection
            video.style.pointerEvents = 'none';

            // 3. Robust Playback: Wait for metadata to ensure video is ready
            video.addEventListener('loadedmetadata', () => {
                video.muted = true; // Start muted for higher autoplay reliability
                this.isMuted.set(true);

                video.play().catch(err => {
                    console.error('❌ Autoplay failed:', err);
                });
            }, { once: true });
        }
    }

    onPlay() {
        this.isPlaying.set(true);
    }

    onPause() {
        this.isPlaying.set(false);
        const video = this.videoRef.nativeElement;

        // Rule: Always show the last frame when paused
        if (video.currentTime < video.duration) {
            video.currentTime = video.duration;
            console.log('Paused: jumping to last frame');
        }
    }

    togglePlay() {
        const video = this.videoRef.nativeElement;
        if (video.paused) {
            // Rule: If playing from the end, restart
            if (video.currentTime >= video.duration || video.ended) {
                video.currentTime = 0;
            }
            video.play().catch(e => {
                console.error('Error playing:', e);
                // Fallback to muted if unmuted play failed
                video.muted = true;
                this.isMuted.set(true);
                return video.play();
            });
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
        // Reproduction Rule: Ensure it stays on last frame
        const video = this.videoRef.nativeElement;
        if (!video.paused) video.pause();
        this.isPlaying.set(false);
    }
}
