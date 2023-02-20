import Link from "next/link"
import React from "react"

type Props = {
  path: string
  query: string
  totalCount: number
  perPage: number
}

export default function Pager(props: Props) {
  const {
    path,
    query,
    totalCount,
    perPage,
  } = props
  const pageCount = Math.ceil(totalCount / perPage)

  // ポストの総数より、ポスト表示数が大きければ
  if (props.totalCount <= props.perPage) return <></>

  const pageList = []
  const currentPage = getCurrentPage(query)

  pageList.push(setPrevPageItem(path, currentPage))

  for (let i=1; i<=pageCount; i++) {
    pageList.push(setPageItem(path, currentPage, i))
  }

  pageList.push(setNextPageItem(path, currentPage, pageCount))

  return (
    <div>
      <li>
        <ul>
          {pageList}
        </ul>
      </li>
    </div>
  )
}

function getCurrentPage(query: string): number {
  const result = query.match(/page=(\d+)/)

  return (result) ? Number(result[1]) : 1
}

function setPageItem(path: string, currentPage: number, i: number) {
  const pageWidth = 3

  if (currentPage === i) {
    return (
      <li key={i}>
        <span>{i}</span>
      </li>
    )
  }

  if (i === currentPage - pageWidth || i === currentPage + pageWidth) {
    return (
      <li key={i}>
        <span>...</span>
      </li>
    )
  }

  if (i < currentPage + pageWidth && i > currentPage - pageWidth) {
    return (
      <li key={i}>
        <Link
          href={{
            pathname: path,
            query: { page: i },
          }}
        >{i}</Link>
      </li>
    )
  }
}

function setPrevPageItem(path: string, currentPage: number) {
  return (<li key="prev">
    {(currentPage <= 1)
      ? <span>Prev</span>
      : <Link
        href={{
          pathname: path,
          query: { page: currentPage - 1 },
        }}
      >Prev</Link>
    }
  </li>
  )
}

function setNextPageItem(path: string, currentPage: number, pageCount: number) {
  return (
    <li key="next">
      {(pageCount <= currentPage)
        ? <span>Next</span>
        : <Link
          href={{
            pathname: path,
            query: { page: currentPage + 1 }
          }}
        >Next</Link>
      }
    </li>
  )
}
