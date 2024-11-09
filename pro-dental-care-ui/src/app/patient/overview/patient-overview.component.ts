import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-patient-overview",
  template: `
    <main class="flex flex-col p-14 bg-white max-w-[940px] max-md:px-5">
      <header class="flex flex-col max-w-full leading-tight w-[568px]">
        <h1 class="tracking-tight font-[number:var(--sds-typography-heading-font-weight)] text-[color:var(--sds-color-text-default-default)] text-[length:var(--sds-typography-heading-size-base)] max-md:max-w-full">
          Hello, Jane Doe
        </h1>
        <p class="mt-2 font-[number:var(--sds-typography-subheading-font-weight)] text-[color:var(--sds-color-text-default-secondary)] text-[length:var(--sds-typography-subheading-size-medium)] max-md:max-w-full">
          This is your overview. Use the sidebar for more specific information.
        </p>
      </header>
      
      <!-- Section for Overview Boxes -->
      <section class="flex flex-wrap gap-12 items-center mt-11 w-full min-h-[316px] max-md:mt-10 max-md:max-w-full">
        
      <!-- Appointment -->
        <article class="overview-box">
          <div class="icon-placeholder" aria-label="Appointment illustration">
            <img src="assets/clock.png" alt="Appointment Icon" />
          </div>
          <div class="text-content">
            <h2>Next Appointment:</h2>
            <p>January 1st, 2025</p>
          </div>
        </article>

        <!--Treatment Plan -->
        <article class="overview-box">
          <div class="icon-placeholder" aria-label="Treatment plan illustration">
            <img src="assets/treatmentplan.png" alt="Treatment Plan Icon" />
          </div>
          <div class="text-content">
            <h2>Current Treatment Plan:</h2>
            <p>Floss extra well</p>
          </div>
        </article>

        <!-- Payment Due -->
        <article class="overview-box">
          <div class="icon-placeholder" aria-label="Payment due illustration">
            <img src="assets/dollar.png" alt="Payment Due Icon" />
          </div>
          <div class="text-content">
            <h2>Next Payment Due:</h2>
            <p>One gazillion dollars - January 1st</p>
          </div>
        </article>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .overview-box {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        padding: 1.25rem;
        background-color: white;
        border: 1px solid #d4d4d4;
        border-radius: 0.5rem;
        min-width: 212px;
        flex: 1;
        align-items: flex-start;
      }

      .icon-placeholder {
        background-color: #d4d4d4; /* Grey background */
        width: 142px;
        height: 142px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
      }

      .icon-placeholder img {
        max-width: 80%; /* Ensures image stays within grey box */
        max-height: 80%;
        object-fit: contain;
      }

      .text-content h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
      }
      .text-content p {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class PatientOverviewComponent {}
