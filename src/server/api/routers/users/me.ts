import {
  chips,
  events,
  eventsToStates,
  intents,
  intentsHierarchy,
  intentsToStates,
  projects,
  scenarists,
  states,
  statesHierarchy,
  statesOwnersHistory,
  teamleads,
  themes,
  tiles,
  users,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const meRouter = createTRPCRouter({
  read: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  populateDatabase: protectedProcedure.mutation(
    async ({ ctx: { session, db } }) => {
      await db.transaction(async (tx) => {
        const [lena] = await tx
          .insert(users)
          .values({
            email: "elenaspitsina@gmail.com",
            fullName: "Елена Спицина",
          })
          .returning({ id: users.id });
        const [teamlead] = await tx
          .insert(teamleads)
          .values({ userId: lena!.id })
          .returning({ id: teamleads.id });
        const [lenaScenarist] = await tx
          .insert(scenarists)
          .values({ teamleadId: teamlead!.id, userId: lena!.id })
          .returning({ id: scenarists.id });

        const [scenarist] = await tx
          .insert(scenarists)
          .values({ teamleadId: teamlead!.id, userId: session.user.id })
          .returning({ id: scenarists.id });

        const [amMass] = await tx
          .insert(projects)
          .values({ title: "am_mass" })
          .returning({ id: projects.id });

        const [cards] = await tx
          .insert(themes)
          .values({
            title: "Cards",
            projectId: amMass!.id,
          })
          .returning({ id: themes.id });

        const [cardSticker] = await tx
          .insert(states)
          .values({
            title: "CardSticker",
            themeId: cards!.id,
            isActive: true,
            name: "Платёжный стикер",
          })
          .returning({ id: states.id });
        const [cardStickerDebit] = await tx
          .insert(states)
          .values({
            title: "CardStickerDebit",
            themeId: cards!.id,
            isActive: true,
            name: "Дебетовый платёжный стикер",
          })
          .returning({ id: states.id });

        await tx
          .insert(statesHierarchy)
          .values({ parentId: cardSticker!.id, childId: cardStickerDebit!.id });
        await tx
          .insert(statesOwnersHistory)
          .values({ stateId: cardSticker!.id, ownerId: lenaScenarist!.id });
        await tx
          .insert(statesOwnersHistory)
          .values({ stateId: cardSticker!.id, ownerId: scenarist!.id });

        const [cardStickerFaqIntent] = await tx
          .insert(intents)
          .values({
            title: "card_sticker_faq",
            projectId: amMass!.id,
            isActive: true,
            name: "Платёжный стикер",
          })
          .returning({ id: intents.id });
        await tx.insert(intentsToStates).values({
          intentId: cardStickerFaqIntent!.id,
          stateId: cardSticker!.id,
          isGlobal: true,
        });

        const [cardStickerFaqEvent] = await tx
          .insert(events)
          .values({
            projectId: amMass!.id,
            title: "card_sticker_faq",
            name: "Платёжный стикер",
          })
          .returning({ id: events.id });
        await tx.insert(eventsToStates).values({
          eventId: cardStickerFaqEvent!.id,
          stateId: cardSticker!.id,
          isGlobal: true,
        });
        await tx.insert(chips).values({
          eventId: cardStickerFaqEvent!.id,
          intentId: cardStickerFaqIntent!.id,
          text: "Всё о стикерах",
        });

        const [cardStickerDebitEvent] = await tx
          .insert(events)
          .values({
            projectId: amMass!.id,
            title: "card_sticker_debit",
            name: "Дебетовый платёжный стикер",
          })
          .returning({ id: events.id });
        await tx.insert(eventsToStates).values({
          eventId: cardStickerDebitEvent!.id,
          stateId: cardStickerDebit!.id,
          isGlobal: true,
        });
        await tx.insert(chips).values({
          eventId: cardStickerDebitEvent!.id,
          intentId: cardStickerFaqIntent!.id,
          text: "Дебетовый стикер",
        });
        await tx.insert(tiles).values({
          eventId: cardStickerDebitEvent!.id,
          intentId: cardStickerFaqIntent!.id,
          text: "Дебетовый стикер",
          description: "Получайте кэшбэк рублями",
        });

        const [main] = await tx
          .insert(themes)
          .values({
            title: "",
            projectId: amMass!.id,
          })
          .returning({ id: themes.id });

        const [oldBotTransfer] = await tx
          .insert(states)
          .values({
            title: "OldBotTransfer",
            themeId: main!.id,
            isActive: true,
            name: "Трансфер на старого бота",
          })
          .returning({ id: states.id });

        const [creditEarlyRepaymentInfoIntent] = await tx
          .insert(intents)
          .values({
            title: "credit_early_repayment_info",
            projectId: amMass!.id,
            isActive: true,
            name: "Досрочное погашение",
          })
          .returning({ id: intents.id });
        const [cntxt1CreditEarlyRepaymentReducFaqIntent] = await tx
          .insert(intents)
          .values({
            title: "cntxt1_credit_early_repayment_reduc_faq",
            projectId: amMass!.id,
            isActive: true,
            name: "Контекст. Как уменьшить срок кредита",
          })
          .returning({ id: intents.id });

        await tx.insert(intentsToStates).values({
          intentId: creditEarlyRepaymentInfoIntent!.id,
          stateId: oldBotTransfer!.id,
          isGlobal: true,
        });

        await tx.insert(intentsToStates).values({
          intentId: cntxt1CreditEarlyRepaymentReducFaqIntent!.id,
          stateId: oldBotTransfer!.id,
          isGlobal: true,
        });

        await tx.insert(intentsHierarchy).values({
          parentId: creditEarlyRepaymentInfoIntent!.id,
          childId: cntxt1CreditEarlyRepaymentReducFaqIntent!.id,
        });
      });
    },
  ),
});
