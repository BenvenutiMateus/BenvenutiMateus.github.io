"""Build the static English and Portuguese pages using only Python's standard library."""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/site.json').read_text())
PROFILE = DATA['profile']
NAME = PROFILE['name']


def icon(kind):
    paths = {
        'search': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
        'theme': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    }
    return f'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">{paths[kind]}</svg>'


def link(url, label, cls='', extra=''):
    return f'<a href="{escape(url, quote=True)}"'+(f' class="{cls}"' if cls else '')+f' {extra}>{escape(label)}</a>'


def paragraphs(items):
    return ''.join(f'<p>{p}</p>' for p in items)


def tags(items):
    return '<ul class="tag-list">'+''.join(f'<li>{escape(x)}</li>' for x in items)+'</ul>'


def contacts(ui, prefix, include_email=False):
    items = []
    if include_email:
        items.append(link('mailto:'+PROFILE['email'], ui['contact']['email'], 'social-button'))
    for key, label in [('github','GitHub'), ('linkedin','LinkedIn'), ('instagram','Instagram'), ('lattes','Lattes'), ('orcid','ORCID')]:
        if PROFILE.get(key):
            items.append(link(PROFILE[key], label, 'social-button'))
    return '<div class="social-links">'+''.join(items)+'</div>'


def cv_links(ui, prefix):
    url = prefix+PROFILE['cv']
    return '<div class="social-links">'+link(url,ui['view_cv'],'social-button')+link(url,ui['download'],'social-button', 'download="Mateus-Benvenuti-CV.pdf"')+'</div>'+f'<p class="detail cv-note">{ui["cv_note"]}</p>'


def card(project, lang, prefix, featured=False):
    ui=DATA[lang];p=project[lang];pid=project['id']
    image=f'<img src="{prefix}assets/projects/{project["image"]}" alt="{ui["preview"]}: {escape(p["title"])}" width="600" height="240" loading="lazy">'
    title=link('projects.html#'+pid,p['title']) if featured else escape(p['title'])
    detail='' if featured else '<details><summary>'+ui['details']+'</summary><ul>'+''.join(f'<li>{escape(x)}</li>' for x in p['details'])+'</ul></details>'
    href='projects.html#'+pid if featured else project['url']
    actions=link(href,ui['view_project'],'work-link')+link(PROFILE['github']+'/'+project['repo'],'GitHub','work-link')
    return f'<article class="work-card"{(" id="+chr(34)+pid+chr(34)) if not featured else ""}>{image}<div class="work-copy"><p class="detail">{p["category"]}</p><h2>{title}</h2><p>{p["summary"]}</p>{tags(project["tech"])}{detail}<div class="work-actions">{actions}</div></div></article>'


def body(page,lang,prefix):
    u=DATA[lang]
    if page=='index':
        h=u['home']
        actions='<div class="social-links">'+link('research.html',u['view_research'],'social-button primary')+link(prefix+PROFILE['cv'],u['download'],'social-button','download="Mateus-Benvenuti-CV.pdf"')+'</div>'
        intro=f'<section class="profile" aria-labelledby="about-title"><img class="profile-photo" src="{prefix}assets/profile-transparent.png" alt="{u["portrait"]}" width="240" height="240"><div><h1 id="about-title">{h["title"]}</h1><p class="role-line">{h["role"]}</p>{paragraphs(h["paragraphs"])}{actions}<p class="detail cv-note">{u["cv_note"]}</p>{contacts(u,prefix)}</div></section>'
        cards=''.join(card(p,lang,prefix,True) for p in DATA['projects'])
        return intro+f'<section class="featured" aria-labelledby="featured-title"><div class="section-heading"><h2 id="featured-title">{u["featured"]}</h2>{link("projects.html",u["all_projects"])}</div><div class="work-grid">{cards}</div></section>'
    if page=='projects':
        return f'<h1>{u["nav"][page]}</h1><p>{u["projects_intro"]}</p><div class="work-grid">'+''.join(card(p,lang,prefix) for p in DATA['projects'])+'</div>'
    if page=='research':
        r=u['research']
        sections=''.join(f'<section class="research-step"><h3>{title}</h3><p>{text}</p></section>' for title,text in r['stages'])
        return f'<article class="text-page"><h1>{u["nav"][page]}</h1><p class="role-line">{r["current"]}</p><h2>{u["research_title"]}</h2><p class="detail">{r["status"]}</p><p>{r["supervisor"]}: <a href="https://thiagorr162.github.io/">Prof. Thiago Rodrigo Ramos</a> · UFSCar</p><div class="research-steps">{sections}</div>{link(PROFILE["github"]+"/Genetica",r["repository"],"social-button")}{tags(r["topics"])}</article>'
    if page=='background':
        b=u['background']
        timeline=''.join(f'<li><p class="detail">{date}</p><h3>{title}</h3><p>{institution}</p><p>{desc}</p></li>' for date,title,institution,desc in b['timeline'])
        return f'<article class="text-page"><h1>{u["nav"][page]}</h1><h2>{b["title"]}</h2><ol class="timeline">{timeline}</ol><section><h2>{b["skills"]}</h2><h3>{b["programming"]}</h3>{tags(b["skill_tools"])}<h3>{b["statistics"]}</h3>{tags(b["skill_stats"])}</section><h2>{b["languages"]}</h2><p>{b["language_text"]}</p>{cv_links(u,prefix)}</article>'
    if page=='contact':
        c=u['contact']
        return f'<article class="text-page"><h1>{u["nav"][page]}</h1><p>{c["intro"]}</p><p>{link("mailto:"+PROFILE["email"],PROFILE["email"],"email-link")}</p><p class="detail">{c["location"]}</p>{contacts(u,prefix,True)}<h2>{c["documents"]}</h2>{cv_links(u,prefix)}</article>'
    info=u[page]
    repo='prog-estat' if page=='notes' else 'minicurso_pandas'
    anchor='statistical-programming-title' if page=='notes' else 'pandas-title'
    return f'<article class="text-page"><h1>{u["nav"][page]}</h1><section aria-labelledby="{anchor}"><h2 id="{anchor}">{info["title"]}</h2><p>{info["description"]}</p><p class="detail">{info["language"]}</p>{link(PROFILE["github"]+"/"+repo,info["link"],"social-button")}</section></article>'


for lang in ['en','pt']:
    u=DATA[lang];prefix='../' if lang=='pt' else '';folder=ROOT/'pt' if lang=='pt' else ROOT
    folder.mkdir(exist_ok=True)
    for page,title in u['nav'].items():
        nav='\n'.join(link(p+'.html',label,extra='aria-current="page"' if p==page else '') for p,label in u['nav'].items())
        languages='<span class="language-switch" role="group" aria-label="'+u['language']+'">'+(' <span aria-current="true" lang="en">EN</span> | '+link('pt/'+page+'.html','PT',extra='lang="pt-BR" hreflang="pt-BR"') if lang=='en' else link('../'+page+'.html','EN',extra='lang="en" hreflang="en"')+' | <span aria-current="true" lang="pt-BR">PT</span>')+'</span>'
        html=f'''<!doctype html>
<html lang="{'pt-BR' if lang=='pt' else 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <meta name="description" content="{title} — {NAME} · {u['affiliation']}">
  <title>{title} | {NAME}</title>
  <link rel="alternate" hreflang="en" href="{prefix}{page}.html">
  <link rel="alternate" hreflang="pt-BR" href="{'' if lang=='pt' else 'pt/'}{page}.html">
  <link rel="stylesheet" href="{prefix}style.css">
  <script src="{prefix}script.js"></script>
  <script src="{prefix}search-data.js" defer></script>
  <script src="{prefix}search.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#content">{u['skip']}</a>
  <header class="top-bar"><nav aria-label="{u['navigation']}">
    {nav}
    <button class="search-toggle" type="button" aria-haspopup="dialog" aria-controls="site-search" aria-keyshortcuts="Control+k Meta+k" aria-label="{u['search']} (Ctrl K / Cmd K)" title="{u['search']} (Ctrl K / Cmd K)" hidden><kbd>Ctrl K</kbd> {icon('search')}</button>
    <button class="theme-toggle" type="button" aria-pressed="false" aria-label="{u['dark']}" title="{u['theme']}" hidden>{icon('theme')}</button>
    {languages}
  </nav></header>
  <div class="site">
    <header class="site-header"><a class="site-name" href="index.html">{NAME}</a><p class="affiliation">{u['affiliation']}</p></header>
    <main id="content">{body(page,lang,prefix)}</main>
    <footer>© <span id="year">2026</span> {NAME}</footer>
  </div>
</body>
</html>
'''
        (folder/(page+'.html')).write_text(html)

search={}
for lang in ['en','pt']:
    u=DATA[lang]
    entries=[{'title':title,'url':page+'.html','description':u['affiliation']} for page,title in u['nav'].items()]
    for p in DATA['projects']:
        entries.append({'title':p[lang]['title'],'url':'projects.html#'+p['id'],'description':p[lang]['summary']+' · '+' '.join(p['tech'])})
    entries.extend([
        {'title':u['research_title'],'url':'research.html','description':'CNPq · '+' · '.join(u['research']['topics'])},
        {'title':u['notes']['title'],'url':'notes.html#statistical-programming-title','description':'Thiago Rodrigo Ramos'},
        {'title':u['presentations']['title'],'url':'presentations.html#pandas-title','description':'PET · pandas · NumPy · Matplotlib'},
        {'title':u['view_cv'],'url':('../' if lang=='pt' else '')+PROFILE['cv'],'description':u['cv_note']},
    ])
    search[lang]={'entries':entries,'ui':dict(u['search_ui'],title=u['search'])}
(ROOT/'search-data.js').write_text('// Generated by tools/build_site.py.\nwindow.siteSearch = '+json.dumps(search,ensure_ascii=False,indent=2)+';\n')
print('Built 14 pages and bilingual search data.')
