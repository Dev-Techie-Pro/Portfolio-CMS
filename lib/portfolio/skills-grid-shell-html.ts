export const SKILLS_GRID_HOME_SHELL = `<div class="skills-grid reveal" data-cms-skills-grid="true" data-cms-skills-limit="3">
            <p class="exp-cms-placeholder" data-cms-skills-loading>Loading skills…</p>
          </div>`;

export const SKILLS_GRID_PAGE_SHELL = `<div class="skills-explorer skills-explorer--pin" data-cms-skills-grid="true" data-cms-skills-layout="explorer" data-skills-pin>
            <div class="skills-explorer__layout">
              <div class="skills-explorer__railwrap" data-skills-railwrap>
                <div class="skills-explorer__rline" aria-hidden="true"><i></i></div>
                <div class="skills-explorer__rail" role="tablist" aria-label="Skill areas" data-skills-rail></div>
              </div>
              <section class="skills-explorer__panel" data-skills-panel role="tabpanel">
                <div class="skills-explorer__head">
                  <div class="skills-explorer__head-text">
                    <span class="skill-cat-icon" data-skills-cat-icon aria-hidden="true"></span>
                    <div>
                      <h3 class="skills-explorer__title" data-skills-title></h3>
                      <p class="skills-explorer__desc" data-skills-desc></p>
                    </div>
                  </div>
                  <div class="skills-explorer__ring" data-skills-ring role="img">
                    <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
                      <circle class="skills-explorer__ring-track" cx="48" cy="48" r="42"></circle>
                      <circle class="skills-explorer__ring-fill" data-skills-arc cx="48" cy="48" r="42"></circle>
                    </svg>
                    <span class="skills-explorer__ring-num" data-skills-num>0%</span>
                  </div>
                </div>
                <ul class="skills-explorer__chips" data-skills-chips></ul>
              </section>
            </div>
            <p class="exp-cms-placeholder" data-cms-skills-loading>Loading skills…</p>
          </div>`;
