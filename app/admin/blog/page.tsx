"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  FileText,
  TrendingUp,
  MessageSquare,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockPosts = [
  {
    id: "1",
    title: "Motosiklet Bakımında Dikkat Edilmesi Gerekenler",
    slug: "motosiklet-bakiminda-dikkat-edilmesi-gerekenler",
    excerpt:
      "Motosikletinizin ömrünü uzatmak için düzenli bakım önemlidir. Bu yazıda temel bakım adımlarını inceliyoruz.",
    image: "/motorcycle-maintenance.png",
    category: "Bakım",
    author: "Admin",
    status: "published",
    views: 1245,
    comments: 23,
    publishedAt: "2024-01-10",
  },
  {
    id: "2",
    title: "2024 Yılının En İyi Fren Balataları",
    slug: "2024-yilinin-en-iyi-fren-balatalari",
    excerpt: "Güvenliğiniz için doğru fren balatası seçimi kritik öneme sahiptir. İşte 2024'ün en iyi seçenekleri.",
    image: "/brake-pads-comparison.png",
    category: "İnceleme",
    author: "Admin",
    status: "published",
    views: 892,
    comments: 15,
    publishedAt: "2024-01-08",
  },
  {
    id: "3",
    title: "Kış Aylarında Motosiklet Depolama",
    slug: "kis-aylarinda-motosiklet-depolama",
    excerpt: "Kış geldiğinde motosikletinizi doğru şekilde depolamak, bahar aylarında sorunsuz sürüş için önemlidir.",
    image: "/winter-motorcycle-storage.jpg",
    category: "Rehber",
    author: "Admin",
    status: "draft",
    views: 0,
    comments: 0,
    publishedAt: null,
  },
  {
    id: "4",
    title: "Yağ Değişimi: Adım Adım Rehber",
    slug: "yag-degisimi-adim-adim-rehber",
    excerpt: "Motosikletinizin yağını kendiniz değiştirmek hem ekonomik hem de eğitici bir deneyim olabilir.",
    image: "/oil-change-motorcycle.jpg",
    category: "Rehber",
    author: "Admin",
    status: "scheduled",
    views: 0,
    comments: 0,
    publishedAt: "2024-01-20",
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const publishedCount = mockPosts.filter((p) => p.status === "published").length
  const totalViews = mockPosts.reduce((sum, p) => sum + p.views, 0)
  const totalComments = mockPosts.reduce((sum, p) => sum + p.comments, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-500">Yayında</Badge>
      case "draft":
        return <Badge variant="secondary">Taslak</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Planlandı
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Yönetimi</h1>
          <p className="text-muted-foreground">Blog yazıları ve içerik yönetimi</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/yeni">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Yazı
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Yazı</p>
              <p className="text-2xl font-bold">{mockPosts.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <Eye className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yayında</p>
              <p className="text-2xl font-bold">{publishedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Görüntülenme</p>
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <MessageSquare className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yorumlar</p>
              <p className="text-2xl font-bold">{totalComments}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Başlık veya kategori ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Görsel</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-center">Görüntülenme</TableHead>
              <TableHead className="text-center">Yorumlar</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-center">Durum</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="relative h-12 w-16 overflow-hidden rounded border bg-muted">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px]">
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell className="text-center">{post.views}</TableCell>
                <TableCell className="text-center">{post.comments}</TableCell>
                <TableCell>
                  {post.publishedAt ? (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(post.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
