-- Assign the six official AFK Journey hero classes to the tracker catalog.
ALTER TABLE public.ss_heroes ADD COLUMN class text;

UPDATE public.ss_heroes AS h
SET class = m.class
FROM (VALUES
    ('atalanta', 'Marksman'),
    ('cassadee', 'Mage'),
    ('chippy', 'Tank'),
    ('cyran', 'Mage'),
    ('estrilda', 'Rogue'),
    ('evie', 'Support'),
    ('fay', 'Support'),
    ('gwyneth', 'Marksman'),
    ('hammie', 'Support'),
    ('hugin', 'Support'),
    ('korin', 'Warrior'),
    ('lucca', 'Tank'),
    ('lucius', 'Tank'),
    ('marilee', 'Marksman'),
    ('mirael', 'Mage'),
    ('orion', 'Warrior'),
    ('peggy', 'Support'),
    ('perseus', 'Warrior'),
    ('rowan', 'Support'),
    ('silven', 'Marksman'),
    ('sinbad', 'Rogue'),
    ('sonja', 'Warrior'),
    ('temesia', 'Tank'),
    ('vala', 'Rogue'),
    ('valen', 'Warrior'),
    ('walker', 'Rogue'),
    ('zanie', 'Marksman'),
    ('alsa', 'Mage'),
    ('antandra', 'Tank'),
    ('brutus', 'Warrior'),
    ('gala', 'Mage'),
    ('gerda', 'Tank'),
    ('hepler', 'Tank'),
    ('kazim', 'Marksman'),
    ('koko', 'Support'),
    ('kordan', 'Warrior'),
    ('kruger', 'Warrior'),
    ('lumont', 'Tank'),
    ('mikola', 'Support'),
    ('nazrik', 'Marksman'),
    ('odie', 'Marksman'),
    ('rhys', 'Marksman'),
    ('satrana', 'Mage'),
    ('seth', 'Rogue'),
    ('shakir', 'Rogue'),
    ('smokey-meerky', 'Support'),
    ('soren', 'Rogue'),
    ('voracia', 'Mage'),
    ('zandrok', 'Warrior'),
    ('arden', 'Mage'),
    ('bryon', 'Marksman'),
    ('damian', 'Support'),
    ('eironn', 'Rogue'),
    ('faramor', 'Rogue'),
    ('florabelle', 'Warrior'),
    ('granny-dahnie', 'Tank'),
    ('hewynn', 'Support'),
    ('indris', 'Marksman'),
    ('kafra', 'Warrior'),
    ('lenya', 'Rogue'),
    ('lily-may', 'Rogue'),
    ('lorsan', 'Support'),
    ('lyca', 'Marksman'),
    ('pang', 'Warrior'),
    ('parisa', 'Mage'),
    ('pippa', 'Mage'),
    ('ravion', 'Rogue'),
    ('solise', 'Support'),
    ('tasi', 'Mage'),
    ('thador', 'Tank'),
    ('tilaya', 'Warrior'),
    ('ulmus', 'Tank'),
    ('velara', 'Support'),
    ('baden', 'Rogue'),
    ('bonnie', 'Marksman'),
    ('callan', 'Tank'),
    ('carolina', 'Mage'),
    ('cecia', 'Marksman'),
    ('daimon', 'Tank'),
    ('eryndor', 'Mage'),
    ('hodgkin', 'Warrior'),
    ('igor', 'Warrior'),
    ('isabella', 'Support'),
    ('karma', 'Tank'),
    ('ludovic', 'Support'),
    ('nara', 'Rogue'),
    ('nerion', 'Marksman'),
    ('niru', 'Support'),
    ('salazer', 'Rogue'),
    ('senea', 'Marksman'),
    ('shadewing', 'Rogue'),
    ('shemira', 'Mage'),
    ('silvina', 'Rogue'),
    ('thoran', 'Tank'),
    ('valka', 'Warrior'),
    ('viperian', 'Mage'),
    ('zorya', 'Warrior'),
    ('aliceth', 'Marksman'),
    ('alna', 'Tank'),
    ('athalia', 'Rogue'),
    ('aurora', 'Mage'),
    ('baelran', 'Warrior'),
    ('dionel', 'Marksman'),
    ('dunlingr', 'Tank'),
    ('elijah-lailah', 'Support'),
    ('marene', 'Mage'),
    ('rolan', 'Support'),
    ('scarlita', 'Warrior'),
    ('sylphira', 'Rogue'),
    ('talene', 'Mage'),
    ('aster', 'Mage'),
    ('berial', 'Rogue'),
    ('contess', 'Support'),
    ('cryonaia', 'Mage'),
    ('gunnar', 'Tank'),
    ('harak', 'Warrior'),
    ('kulu', 'Marksman'),
    ('lamentis', 'Marksman'),
    ('mehira', 'Mage'),
    ('phraesto', 'Tank'),
    ('reinier', 'Support'),
    ('saida', 'Rogue'),
    ('frieren', 'Mage'),
    ('himmel', 'Warrior'),
    ('laios', 'Warrior'),
    ('lucy', 'Mage'),
    ('marcille', 'Mage'),
    ('natsu', 'Warrior'),
    ('pandora', 'Support'),
    ('taichi', 'Warrior'),
    ('yamato', 'Mage')
) AS m(id, class)
WHERE h.id = m.id;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.ss_heroes WHERE class IS NULL) THEN
    RAISE EXCEPTION 'Hero class migration incomplete: one or more heroes have no class assignment';
  END IF;
END $$;

ALTER TABLE public.ss_heroes
  ALTER COLUMN class SET NOT NULL,
  ADD CONSTRAINT ss_heroes_class_check
    CHECK (class = ANY (ARRAY['Mage','Marksman','Rogue','Support','Tank','Warrior']::text[]));

CREATE OR REPLACE FUNCTION public.ss_get_config()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
WITH RECURSIVE cycle AS (
  SELECT 0 AS offset_days, 'top-defender'::text AS theme_id
  UNION ALL
  SELECT offset_days + 3,
         CASE offset_days WHEN 0 THEN 'siegebreaker' WHEN 3 THEN 'fierce-duel' WHEN 6 THEN 'tactical-grounds' WHEN 9 THEN 'tranquil-grounds' ELSE 'top-defender' END
  FROM cycle WHERE offset_days < 12
),
current_cycle AS (
  SELECT theme_id FROM cycle
  WHERE offset_days = (((floor(EXTRACT(EPOCH FROM (date_trunc('day', now() AT TIME ZONE 'UTC') - TIMESTAMPTZ '2026-11-14 00:00:00+00')) / 86400))::int / 3) % 5) * 3
)
SELECT jsonb_build_object(
  'event', (SELECT jsonb_build_object('id', e.id, 'name', e.name, 'current_theme_id', COALESCE(s.manual_theme_id, c.theme_id)) FROM public.ss_settings s JOIN public.ss_events e ON e.id = s.current_event_id CROSS JOIN current_cycle c WHERE s.id = 1),
  'themes', COALESCE((SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name, 'map_image_url', t.map_image_url) ORDER BY t.name) FROM public.ss_themes t JOIN public.ss_settings s ON s.current_event_id = t.event_id WHERE s.id = 1), '[]'::jsonb),
  'heroes', COALESCE((SELECT jsonb_agg(jsonb_build_object('id', h.id, 'name', h.name, 'faction', h.faction, 'class', h.class, 'portrait_url', h.portrait_url, 'is_allowed', COALESCE(eh.is_allowed, false)) ORDER BY h.faction, h.name) FROM public.ss_heroes h CROSS JOIN public.ss_settings s LEFT JOIN public.ss_event_heroes eh ON eh.hero_id = h.id AND eh.event_id = s.current_event_id WHERE s.id = 1), '[]'::jsonb)
);
$function$;
