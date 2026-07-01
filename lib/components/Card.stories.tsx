import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  CardEyebrow,
  StatCard,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type CardStory = StoryObj<typeof Card>;

export const Variants: CardStory = {
  render: () => (
    <div className="flex gap-4">
      {(["outlined", "elevated", "flat"] as const).map((v) => (
        <Card key={v} variant={v} className="w-52">
          <CardHeader>
            <CardTitle className="capitalize">{v}</CardTitle>
            <CardDescription>Surface treatment</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
};

export const Clickable: CardStory = {
  render: () => (
    <Card clickable className="w-64">
      <CardHeader>
        <CardEyebrow>Dataset</CardEyebrow>
        <CardTitle>atlas-drives-q2</CardTitle>
        <CardDescription>Hover to see the lift.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const ArticleMedia: CardStory = {
  render: () => (
    <Card variant="elevated" className="w-72 overflow-hidden">
      <CardMedia>Latent video models</CardMedia>
      <CardHeader>
        <CardEyebrow>Research · 8 min read</CardEyebrow>
        <CardTitle>Human-scale data</CardTitle>
        <CardDescription>Scaling latent video models for robotics.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const StatTiles: CardStory = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-44">
        <StatCard label="Datasets" value="1,284" delta="+12%" deltaDirection="up" />
      </Card>
      <Card className="w-44">
        <StatCard label="Errors" value="37" delta="-8%" deltaDirection="down" />
      </Card>
    </div>
  ),
};

type Story = StoryObj<typeof Card>;

export const Outlined: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Outlined card</CardTitle>
        <CardDescription>
          Default container — hairline border on white. Use for most surfaces.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Atlas SDK 2.0</CardTitle>
        <CardDescription>
          Single import, zero config. Stream sensor data straight into your
          training loop.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Badge variant="secondary">Beta</Badge>
        <Button size="sm">Get access</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>atlas-drives-q2</CardTitle>
        <CardDescription>Dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[13px] text-muted-foreground">
          1.28M labeled drives · 24 cities · updated 2h ago.
        </p>
      </CardContent>
    </Card>
  ),
};

export const KpiTile: Story = {
  render: () => (
    <Card className="w-64">
      <CardContent className="flex flex-col gap-1 p-5">
        <span className="text-xs text-muted-foreground">Active drives</span>
        <span className="text-[32px] font-semibold tracking-tight text-foreground">
          2,884
        </span>
        <span className="text-xs font-medium text-success">↑ 24.8% vs Q1</span>
      </CardContent>
    </Card>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Hairline border on white.</CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-transparent shadow-md">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Soft shadow, no border.</CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-transparent bg-muted shadow-none">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>Tinted background, no border.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};
