-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "customerName" TEXT,
    "issueType" TEXT,
    "urgency" TEXT,
    "area" TEXT,
    "symptoms" TEXT,
    "timeframe" TEXT,
    "attemptedFix" TEXT,
    "photoUrl" TEXT,
    "conversationSummary" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "step" TEXT NOT NULL DEFAULT 'greeting',
    "urgencyScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
