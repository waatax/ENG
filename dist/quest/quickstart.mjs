// One-click lesson entry preserves existing profiles and unfinished sessions.
export async function startQuickLesson(game, course, ensure) {
  if (!game.state.profile) game.setup({goal:'casual',why:'life',start:'s1'});
  if (game.state.session) {
    const s=game.state.session;
    if (!await ensure(game.filesFor(s.mode,s.ref))) return {status:'unavailable'};
    if (game.validSession()) return {status:'resumed',track:game.state.profile.start};
  }
  const preferred=game.state.profile.start;
  const track=(course.track(preferred)&&game.trackUnlocked(preferred)&&game.current(preferred))?preferred:course.index.sections.find(s=>game.trackUnlocked(s.id)&&game.current(s.id))?.id;
  if (!track) return {status:'complete',track:preferred};
  const ref=game.current(track);
  if (!await ensure(game.filesFor('lesson',ref))) return {status:'unavailable',track};
  return {status:game.start('lesson',ref)?'started':'unavailable',track};
}
