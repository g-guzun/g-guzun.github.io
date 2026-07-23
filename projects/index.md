---
layout: default
title: Projects
---

### Projects

Research software from the Guzun Lab at San Jose State University. Select a project to learn more.

<ul class="projects-grid">
{% for project in site.data.projects %}
  <li>
    <a class="project-card" href="{{ '/projects/' | append: project.slug | append: '/' | relative_url }}">
      <div class="project-card-image">
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" />
      </div>
      <div class="project-card-body">
        <h3>{{ project.title }}</h3>
        <p class="tagline">{{ project.tagline }}</p>
        <span class="learn-more">Learn More &rarr;</span>
      </div>
    </a>
  </li>
{% endfor %}
</ul>
