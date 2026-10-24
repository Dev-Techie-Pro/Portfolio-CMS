/** Shared career timeline shell — populated client-side via experience-cms.js */
export const EXPERIENCE_TIMELINE_SECTION_HTML = `<section class="exp-work exp-work--hscroll" id="exp-work" aria-label="Career timeline" data-cms-experience="true">
      <div class="exp-hscroll-root">
        <div class="container exp-hscroll-intro">
          <div class="exp-work-header reveal">
            <div class="exp-work-title-wrap">
              <div class="section-title-group reveal-left ">
                <p class="section-label">My Journey</p>
                <h2 class="about-heading"> Career <br />
                  <strong> Timeline</strong>
                </h2>
              </div>
              <p class="exp-work-subtitle reveal">A timeline of my professional journey, the impact I've created, and the technologies I've mastered along the way.</p>
            </div>
          </div>
        </div>
        <div class="exp-hscroll-stage">
        <div class="container">
        <div class="exp-tl" data-exp-timeline>
          <div class="exp-tl-track" role="tablist" aria-label="Career timeline" data-cms-exp-track>
            <p class="exp-cms-placeholder" data-cms-exp-loading>Loading experience…</p>
          </div>
        </div>

        <div class="exp-role-stage" data-exp-stage data-cms-exp-stage></div>

        <div class="exp-skill-row">
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siCode"></span></div>
            <div>
              <h4>Full Stack Expertise</h4>
              <p>End-to-end delivery across UI, APIs, and databases.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siUsers"></span></div>
            <div>
              <h4>Agile Collaboration</h4>
              <p>Cross-functional teamwork with timely, quality releases.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siSpark"></span></div>
            <div>
              <h4>Performance Focus</h4>
              <p>Faster queries, lighter frontends, measurable gains.</p>
            </div>
          </div>
          <div class="exp-skill-item">
            <div class="exp-skill-icon" aria-hidden="true"><span class="icon" data-icon="siAward"></span></div>
            <div>
              <h4>Client Satisfaction</h4>
              <p>Reliable handoffs and 100% client satisfaction.</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>`;
