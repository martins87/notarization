"use client";

import Container from "@/components/Container";
import Icon from "@/components/Icon";
import PlainText from "@/components/PlainText";
import File from "@/components/File";
import Pen from "./assets/Pen.svg";
import PaperClip from "./assets/PaperClip.svg";
import List from "./assets/List.svg";
import { useState } from "react";
import TxList from "@/components/TxList";

export default function Home() {
  const [card, setCard] = useState(0);

  return (
    <Container>
      <div className="flex gap-6">
        <Icon icon={Pen} onClick={() => setCard(0)} />
        <Icon icon={PaperClip} onClick={() => setCard(1)} />
        <Icon icon={List} onClick={() => setCard(2)} />
      </div>
      {card === 0 && <PlainText />}
      {card === 1 && <File />}
      {card === 2 && <TxList />}
    </Container>
  );
}
