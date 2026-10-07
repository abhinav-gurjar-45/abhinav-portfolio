<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the portfolio on one scrolling index page with section anchors because the requested navigation explicitly uses smooth scrolling and active section tracking.
- Store portfolio content in a browser-safe data module and reusable section components to keep the index focused on presentation.
- Contact form composes a mailto link client-side; the site has no backend or database.
- Keep absent project and certificate destinations unavailable rather than fabricating links; project actions open the supplied project details.
