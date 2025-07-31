<script>
import { goto } from "$app/navigation";

</script>

<div class="h-[100vh] flex flex-col items-center justify-center">
    <h1 class="text-8xl mb-10">A Website Survey</h1>
    <button class="!text-3xl nextBtn" onclick={() => goto("/survey")}>
        START
    </button>
</div>